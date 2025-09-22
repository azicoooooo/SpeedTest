from datetime import datetime
from pathlib import Path
from typing import Tuple

import gspread
import pandas as pd
from oauth2client.service_account import ServiceAccountCredentials
from pydrive.auth import GoogleAuth
from pydrive.drive import GoogleDrive
from selenium import webdriver
from selenium.common.exceptions import TimeoutException
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait

SPEEDTEST_URL = 'https://www.speedtest.net/run'
SCOPE = ['https://spreadsheets.google.com/feeds', 'https://www.googleapis.com/auth/drive']
GOOGLE_SHEET_KEY = '1j-gxQwT31Eu3Y_8YiN-FEMQROrXSID7aX5AykqiJolM'
DRIVE_FOLDER_ID = '1VIu4e8gCy0kqroVW_kq4_Xo6kq0dcotu'
LOCAL_BASE_PATH = Path('C:/Users/PC-04/Desktop/SpeedTest')
EXCEL_PATH = LOCAL_BASE_PATH / 'SpeedTest.xlsx'
SCREENSHOT_DIR = LOCAL_BASE_PATH / 'Screenshots'
CREDENTIALS_PATH = LOCAL_BASE_PATH / 'client_secret.json'
CHANNEL = 'principal'
DATA_COLUMNS = [
    'Fecha',
    'Canal',
    'Jornada',
    'Descargar (Mb/s)',
    'Cargar (Mb/s)',
    'Latencia (ms)',
    'Result ID',
    'Evidencia',
    'Observación',
]


def semaforizacion(valor: float, verde: float, naranja: float, rojo: float) -> str:
    if valor > verde:
        return 'Verde'
    if valor > naranja:
        return 'Naranja'
    return 'Rojo'


def observacion(descarga: str, carga: str, latencia: str) -> str:
    if descarga == 'Verde' and carga == 'Verde' and latencia == 'Verde':
        return 'Red estable'
    if descarga != 'Verde':
        return 'Descarga inestable'
    if carga != 'Verde':
        return 'Carga inestable'
    if latencia != 'Verde':
        return 'Latencia inestable'
    return 'Estado desconocido'


def wait_for_value(driver: webdriver.Chrome, css_selector: str, timeout: int = 120) -> str:
    element = WebDriverWait(driver, timeout).until(
        EC.visibility_of_element_located((By.CSS_SELECTOR, css_selector))
    )
    return element.text.strip()


def get_speedtest_results(driver: webdriver.Chrome) -> Tuple[float, float, float, str]:
    download_text = wait_for_value(driver, '.download-speed')
    upload_text = wait_for_value(driver, '.upload-speed')
    ping_text = wait_for_value(driver, '.ping-speed')

    download_speed = float(download_text.replace(',', '.'))
    upload_speed = float(upload_text.replace(',', '.'))
    ping_speed = float(ping_text.replace(',', '.').replace("'", ''))

    try:
        result_id_text = wait_for_value(driver, '.result-data', timeout=60)
    except TimeoutException:
        result_id_text = ''

    return download_speed, upload_speed, ping_speed, result_id_text


def close_modal_if_present(driver: webdriver.Chrome) -> None:
    try:
        close_button = WebDriverWait(driver, 10).until(
            EC.element_to_be_clickable((By.CSS_SELECTOR, '.close-btn.pure-button.pure-button-primary'))
        )
    except TimeoutException:
        return

    try:
        close_button.click()
        WebDriverWait(driver, 5).until(EC.invisibility_of_element(close_button))
    except Exception as exc:  # noqa: BLE001
        print(f'No se pudo cerrar el modal: {exc}')


def determine_jornada() -> Tuple[str, int]:
    current_hour = datetime.now().hour
    if current_hour < 12:
        return 'Mañana', 1
    if current_hour < 14:
        return 'Mañana', 2
    return 'Tarde', 1


def load_existing_data(path: Path) -> pd.DataFrame:
    if path.exists():
        return pd.read_excel(path)
    return pd.DataFrame(columns=DATA_COLUMNS)


def update_local_excel(df_existing: pd.DataFrame, df_new: pd.DataFrame, path: Path) -> None:
    df_updated = pd.concat([df_existing, df_new], ignore_index=True)
    df_updated.to_excel(path, index=False)


def upload_screenshot_to_drive(drive_client: GoogleDrive, screenshot_path: Path, jornada: str, num_tests: int) -> str:
    file_title = f'{jornada}-{datetime.now().strftime("%d%m%Y")}.{num_tests}.png'
    file_drive = drive_client.CreateFile({'title': file_title, 'parents': [{'id': DRIVE_FOLDER_ID}]})
    file_drive.SetContentFile(str(screenshot_path))
    file_drive.Upload()
    file_drive.InsertPermission({'type': 'anyone', 'value': 'anyone', 'role': 'reader'})
    return file_drive['alternateLink']


def append_row_to_sheet(sheet, row_data, evidence_link: str) -> None:
    existing_rows = len(sheet.get_all_values())
    target_row = existing_rows + 1
    sheet.append_row(row_data)
    formula = '=HIPERVINCULO("{}"; "{}")'.format(
        evidence_link,
        f'Evidencia {datetime.now().strftime("%d/%m/%Y")}',
    )
    sheet.update_cell(target_row, 8, formula)


def main() -> None:
    driver = webdriver.Chrome()
    driver.maximize_window()
    driver.get(SPEEDTEST_URL)

    try:
        download_speed, upload_speed, ping_speed, result_id = get_speedtest_results(driver)
        close_modal_if_present(driver)

        download_status = semaforizacion(download_speed, 80, 50, 0)
        upload_status = semaforizacion(upload_speed, 80, 60, 0)
        ping_status = semaforizacion(ping_speed, 0, 30, 60)
        observacion_status = observacion(download_status, upload_status, ping_status)

        jornada, num_tests = determine_jornada()

        df_existing = load_existing_data(EXCEL_PATH)
        data = {
            'Fecha': [datetime.now().strftime('%d/%m/%Y').replace("'", '')],
            'Canal': [CHANNEL],
            'Jornada': [jornada.lower()],
            'Descargar (Mb/s)': [download_speed],
            'Cargar (Mb/s)': [upload_speed],
            'Latencia (ms)': [ping_speed],
            'Result ID': [result_id],
            'Evidencia': [f'Evidencia {datetime.now().strftime("%d/%m/%Y")}'],
            'Observación': [observacion_status],
        }
        df_new = pd.DataFrame(data, columns=DATA_COLUMNS)
        update_local_excel(df_existing, df_new, EXCEL_PATH)

        SCREENSHOT_DIR.mkdir(parents=True, exist_ok=True)
        screenshot_path = SCREENSHOT_DIR / f'{jornada}-{datetime.now().strftime("%d%m%Y")}.{num_tests}.png'
        driver.save_screenshot(str(screenshot_path))

        creds = ServiceAccountCredentials.from_json_keyfile_name(str(CREDENTIALS_PATH), SCOPE)
        gauth = GoogleAuth()
        gauth.credentials = creds
        drive_client = GoogleDrive(gauth)
        sheets_client = gspread.authorize(creds)
        sheet = sheets_client.open_by_key(GOOGLE_SHEET_KEY).sheet1

        share_link = upload_screenshot_to_drive(drive_client, screenshot_path, jornada, num_tests)

        row = [
            datetime.now().strftime('%d/%m/%Y'),
            CHANNEL,
            jornada.lower(),
            download_speed,
            upload_speed,
            ping_speed,
            result_id,
            f'Evidencia {datetime.now().strftime("%d/%m/%Y")}',
            observacion_status,
        ]
        append_row_to_sheet(sheet, row, share_link)
    finally:
        driver.quit()


if __name__ == '__main__':
    main()

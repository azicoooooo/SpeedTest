from selenium import webdriver
from selenium.webdriver.common.by import By
import time
import pandas as pd
from datetime import datetime
import gspread
import pygsheets
from oauth2client.service_account import ServiceAccountCredentials
from pydrive.auth import GoogleAuth
from pydrive.drive import GoogleDrive
import pywhatkit as kit

def semaforizacion(valor, verde, naranja, rojo):
    if valor > verde:
        return 'Verde'
    elif valor > naranja:
        return 'Naranja'
    else:
        return 'Rojo'

def observacion(descarga, carga, latencia):
    if descarga == 'Verde' and carga == 'Verde' and latencia == 'Verde':
        return 'Red estable'
    elif descarga != 'Verde':
        return 'Descarga inestable'
    elif carga != 'Verde':
        return 'Carga inestable'
    elif latencia != 'Verde':
        return 'Latencia inestable'
    else:
        return 'Estado desconocido'

driver = webdriver.Chrome()
driver.maximize_window()
driver.get('https://www.speedtest.net/run')
time.sleep(60)

# Obtiene los resultados del test y reemplaza el punto por una coma
download_speed = float(driver.find_element(By.CSS_SELECTOR, '.download-speed').text.replace(',', '.'))
upload_speed = float(driver.find_element(By.CSS_SELECTOR, '.upload-speed').text.replace(',', '.'))
ping_speed = float(driver.find_element(By.CSS_SELECTOR, '.ping-speed').text.replace(',', '.').replace("'", ""))

# Espera a que aparezca el modal
time.sleep(10)

# Intenta encontrar el botón de cierre y hacer clic en él
try:
    close_button = driver.find_element(By.CSS_SELECTOR, '.close-btn.pure-button.pure-button-primary')
    if close_button:
        print("Botón de cierre encontrado.")
        close_button.click()
        print("Se hizo clic en el botón de cierre.")
    else:
        print("Botón de cierre no encontrado.")
    # Espera a que el modal se cierre
    time.sleep(2)
except Exception as e:
    print(f"No se pudo cerrar el modal: {e}")



# Semaforización
download_status = semaforizacion(download_speed, 80, 50, 0)
upload_status = semaforizacion(upload_speed, 80, 60, 0)
ping_status = semaforizacion(ping_speed, 0, 30, 60)

# Observación
observacion_status = observacion(download_status, upload_status, ping_status)

# Determina la jornada en función de la hora actual
current_hour = datetime.now().hour
if current_hour < 12:
    jornada = 'Mañana'
    num_tests = 1
elif current_hour < 14:
    jornada = 'Mañana'
    num_tests = 2
else:
    jornada = 'Tarde'
    num_tests = 1

df_existing = pd.read_excel('C:/Users/PC-04/Desktop/SpeedTest/SpeedTest.xlsx')

# Crea un DataFrame con tus datos
data = {
    'Fecha': [datetime.now().strftime('%d/%m/%Y').replace("'", "")],
    'Canal': ['principal'],
    'Jornada': [jornada.lower()],
    'Descargar (Mb/s)': [download_speed],
    'Cargar (Mb/s)': [upload_speed],
    'Latencia (ms)': [ping_speed],
    'Evidencia': [f'Evidencia {datetime.now().strftime("%d/%m/%Y")}'],
    'Observación': [observacion_status]
}
df_new = pd.DataFrame(data)

# Añade los nuevos datos al DataFrame existente
df_updated = pd.concat([df_existing, df_new], ignore_index=True)

# Escribe el DataFrame actualizado al archivo Excel
df_updated.to_excel('C:/Users/PC-04/Desktop/SpeedTest/SpeedTest.xlsx', index=False)

screenshot_path = f'C:/Users/PC-04/Desktop/SpeedTest/Screenshots/{jornada}-{datetime.now().strftime("%d%m%Y")}.{num_tests}.png'
driver.save_screenshot(screenshot_path)

scope = ['https://spreadsheets.google.com/feeds', 'https://www.googleapis.com/auth/drive']
creds = ServiceAccountCredentials.from_json_keyfile_name('C:/Users/PC-04/Desktop/SpeedTest/client_secret.json', scope)
gauth = GoogleAuth()
gauth.credentials = creds
client_drive = GoogleDrive(gauth)
client_sheets = gspread.authorize(creds)
sheet = client_sheets.open_by_key('1j-gxQwT31Eu3Y_8YiN-FEMQROrXSID7aX5AykqiJolM').sheet1 # Abre el archivo de Google Sheets y selecciona la primera hoja

# Sube la captura de pantalla a una carpeta específica en Google Drive y le da el nombre correcto
file_drive = client_drive.CreateFile({'title': f'{jornada}-{datetime.now().strftime("%d%m%Y")}.{num_tests}.png', 'parents': [{'id': '1VIu4e8gCy0kqroVW_kq4_Xo6kq0dcotu'}]})
file_drive.SetContentFile(screenshot_path)
file_drive.Upload()

file_drive.InsertPermission({
    'type': 'anyone',
    'value': 'anyone',
    'role': 'reader'
})

share_link = file_drive['alternateLink']

# Añade una nueva fila con los datos al final de la hoja de cálculo y actualiza la celda con el hipervínculo 
row = [datetime.now().strftime('%d/%m/%Y'), 'principal', jornada.lower(), download_speed, upload_speed, ping_speed, f'Evidencia {datetime.now().strftime("%d/%m/%Y")}', observacion_status]
index = len(sheet.get_all_values()) + 1
sheet.append_row(row)
formula = '=HIPERVINCULO("{}"; "{}")'.format(share_link, f'Evidencia {datetime.now().strftime("%d/%m/%Y")}')
sheet.update_cell(index, 7, formula)

driver.quit()

# Prepara el mensaje de WhatsApp
emoji_download = '🟢' if download_status == 'Verde' else '🟠' if download_status == 'Naranja' else '🔴'
emoji_upload = '🟢' if upload_status == 'Verde' else '🟠' if upload_status == 'Naranja' else '🔴'
emoji_ping = '🟢' if ping_status == 'Verde' else '🟠' if ping_status == 'Naranja' else '🔴'
emoji_observacion = '✅' if observacion_status == 'Red estable' else '⚠'

whatsapp_message = f"\n*🌐 SpeedTest STMC {datetime.now().strftime('%d/%m/%Y')}*\n"\
                   f"\n*● Estado:* {observacion_status} {emoji_observacion}\n"\
                   f"\n*● Canal:* principal\n"\
                   f"\n*● Jornada:* {jornada.lower()}\n"\
                   f"\n*● Descarga (Mb/s):* {download_speed} {emoji_download}\n"\
                   f"\n*● Subida (Mb/s):* {upload_speed} {emoji_upload}\n"\
                   f"\n*● Latencia (ms):* {ping_speed} {emoji_ping}\n"\
                   f"\n*● Evidencia:* {share_link}\n"\
                   f"\n\nPara más detalles, por favor visita el siguiente enlace: https://docs.google.com/spreadsheets/d/1j-gxQwT31Eu3Y_8YiN-FEMQROrXSID7aX5AykqiJolM/edit#gid=0"\
                   f"\n\n\n_Mensaje de tipo notificación enviado por sistema automatizado._"\
                   
# Obtiene la hora actual y añade un minuto
now = datetime.now()
hours = now.hour
minutes = now.minute + 1

# Envia el mensaje
kit.sendwhatmsg_instantly("+573208647379", whatsapp_message, wait_time=10)

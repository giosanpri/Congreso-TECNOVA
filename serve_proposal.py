import http.server
import socketserver
import socket
import sys

PORT = 8080

def get_local_ip():
    try:
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        s.connect(("8.8.8.8", 80))
        ip = s.getsockname()[0]
        s.close()
        return ip
    except Exception:
        return "127.0.0.1"

local_ip = get_local_ip()

print("=" * 65)
print("SERVIDOR DE REVISION - CONGRESO TECNOVA 2026 / TEC-RED")
print("=" * 65)
print(f"-> Enlace Local (tu equipo):       http://localhost:{PORT}")
print(f"-> Enlace Red Local (para pruebas): http://{local_ip}:{PORT}")
print("-" * 65)
print("Para compartir por Internet publica para pruebas (opcional con npx):")
print(f"   Ejecuta en consola: npx localtunnel --port {PORT}")
print("=" * 65)

class Handler(http.server.SimpleHTTPRequestHandler):
    pass

try:
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        print(f"\nServidor activo escuchando en el puerto {PORT}... (Presiona Ctrl+C para detener)")
        httpd.serve_forever()
except KeyboardInterrupt:
        print("\nServidor detenido.")
        sys.exit(0)

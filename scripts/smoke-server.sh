#!/usr/bin/env bash
# Prueba el servidor de la imagen ya levantada: códigos, caché y redirección.
# Uso: scripts/smoke-server.sh http://127.0.0.1:8080
set -uo pipefail

base="${1:?falta la dirección base, por ejemplo http://127.0.0.1:8080}"
fallas=0

espera() {
  if [ "$2" = "$3" ]; then
    echo "ok     $1"
  else
    echo "FALLA  $1: se esperaba «$3», llegó «$2»"
    fallas=$((fallas + 1))
  fi
}
contiene() {
  case "$2" in
    *"$3"*) echo "ok     $1" ;;
    *) echo "FALLA  $1: se esperaba que «$2» contuviera «$3»"; fallas=$((fallas + 1)) ;;
  esac
}
codigo() { curl -s -o /dev/null -m 10 -w '%{http_code}' "$@"; }
cabecera() {
  local nombre="$1"; shift
  curl -s -o /dev/null -m 10 -D - "$@" | tr -d '\r' |
    awk -F': ' -v h="$nombre" 'tolower($1) == tolower(h) { print $2 }' | tail -1
}

espera "el inicio responde 200" "$(codigo "$base/")" 200
espera "Sobre mí responde 200" "$(codigo "$base/about/")" 200
espera "una ficha de proyecto responde 200" "$(codigo "$base/projects/agent-workflow/")" 200

espera "una ruta que no existe responde 404" "$(codigo "$base/no-existe/")" 404
espera "un proyecto retirado responde 404" "$(codigo "$base/projects/let-me-know/")" 404
espera "la dirección con el nombre anterior responde 404" "$(codigo "$base/projects/workline/")" 404
espera "el 404 no se guarda en caché" "$(cabecera cache-control "$base/no-existe/")" "no-store"
contiene "el 404 muestra la página de error del sitio" "$(curl -s -m 10 "$base/no-existe/")" "Esta página no existe"

espera "un archivo de /_astro/ que no existe responde 404" "$(codigo "$base/_astro/no-existe.css")" 404
espera "ese 404 tampoco se guarda en caché" "$(cabecera cache-control "$base/_astro/no-existe.css")" "no-store"

css="$(curl -s -m 10 "$base/" | grep -o '/_astro/[^"]*\.css' | head -1)"
contiene "el inicio enlaza una hoja de estilos" "${css:-nada}" "/_astro/"
espera "la hoja de estilos responde 200" "$(codigo "$base$css")" 200
contiene "la hoja de estilos se sirve como CSS" "$(cabecera content-type "$base$css")" "text/css"
contiene "la hoja de estilos se guarda a largo plazo" "$(cabecera cache-control "$base$css")" "immutable"

espera "la imagen de vista previa responde 200" "$(codigo "$base/og.png")" 200
espera "la imagen de vista previa se guarda un día" "$(cabecera cache-control "$base/og.png")" "max-age=86400"
contiene "la fuente se guarda a largo plazo" "$(cabecera cache-control "$base/fonts/archivo-latin-wght.woff2")" "immutable"

antiguo=(-H "Host: portfolio.tacuchi.dev")
espera "el dominio antiguo redirige con 301" "$(codigo "${antiguo[@]}" "$base/projects/")" 301
espera "y conserva la ruta" "$(cabecera location "${antiguo[@]}" "$base/projects/")" "https://tacuchi.dev/projects/"

if [ "$fallas" -gt 0 ]; then
  echo "smoke: $fallas comprobaciones fallaron"
  exit 1
fi
echo "smoke: todas las comprobaciones pasan"

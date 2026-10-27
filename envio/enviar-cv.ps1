<#
.SYNOPSIS
  Prepara en 10 segundos un correo de candidatura con tu CV.

.DESCRIPTION
  Abre un borrador de Gmail (sesión de lmrodriguez2017@gmail.com en el navegador) con el
  destinatario, el asunto y el texto ya escritos, y abre el Explorador con el PDF del CV
  seleccionado para arrastrarlo al correo. No envía nada: tú revisas y pulsas «Enviar».
  Cada candidatura queda anotada en envio/candidaturas.csv para hacer seguimiento.

.EXAMPLE
  .\enviar-cv.ps1 -Empresa "Cabify" -Email "talento@cabify.com" -Puesto "Backend Engineer"

.EXAMPLE
  .\enviar-cv.ps1 -Empresa "Datadog" -Email "jobs@datadoghq.com" -Puesto "Software Engineer" -Idioma en

.EXAMPLE
  .\enviar-cv.ps1 -Empresa "Acme" -Email "rrhh@acme.es" -Contacto "Marta" -Mailto
#>
param(
  [Parameter(Mandatory)] [string] $Empresa,
  [Parameter(Mandatory)] [string] $Email,
  [string] $Puesto = '',
  [string] $Contacto = '',
  [ValidateSet('es', 'en')] [string] $Idioma = 'es',
  # Usa el cliente de correo predeterminado (mailto:) en vez de Gmail web.
  [switch] $Mailto
)

$ErrorActionPreference = 'Stop'
$root = Split-Path -Parent $PSScriptRoot
$web = 'https://luis.inmovira.com'

if ($Idioma -eq 'es') {
  $pdf = Join-Path $root 'cv\CV_Luis_Marquina_Rodriguez.pdf'
  $saludo = if ($Contacto) { "Hola, ${Contacto}:" } else { 'Hola:' }
  $puestoTxt = if ($Puesto) { "el puesto de $Puesto" } else { 'posiciones de ingeniería de software' }
  $asunto = if ($Puesto) { "Candidatura: $Puesto — Luis Marquina" } else { "Candidatura espontánea — Luis Marquina, ingeniero de software" }
  $cuerpo = @"
$saludo

Me pongo en contacto con $Empresa por $puestoTxt. Soy ingeniero de software full-stack y en 2026 he puesto en producción dos productos SaaS con IA:

• Zeonida (zeonida.com): asistente de IA para despachos jurídicos, con backend en Rust y web en React + TypeScript, seudonimización de datos y despliegue continuo.
• Inmovira (inmovira.com): SaaS inmobiliario con rastreo de portales cada hora, pipeline de IA y CRM multi-tenant en TypeScript.

Te adjunto mi CV. Puedes ver mis proyectos en $web y mi código en github.com/Luiiss44.

Me encantaría comentar cómo puedo aportar a vuestro equipo. Quedo a tu disposición.

Un saludo,
Luis Marquina Rodríguez
$web · linkedin.com/in/luismarrod
"@
} else {
  $pdf = Join-Path $root 'cv\CV_Luis_Marquina_Rodriguez_EN.pdf'
  $saludo = if ($Contacto) { "Hi $Contacto," } else { 'Hello,' }
  $puestoTxt = if ($Puesto) { "the $Puesto role" } else { 'software engineering opportunities' }
  $asunto = if ($Puesto) { "Application: $Puesto — Luis Marquina" } else { 'Software engineer — Luis Marquina' }
  $cuerpo = @"
$saludo

I'm reaching out to $Empresa about $puestoTxt. I'm a full-stack software engineer and in 2026 I shipped two AI-powered SaaS products to production:

• Zeonida (zeonida.com): AI assistant for law firms, with a Rust backend, a React + TypeScript web app, data pseudonymisation and continuous deployment.
• Inmovira (inmovira.com): real estate SaaS with hourly portal crawling, an AI pipeline and a multi-tenant CRM in TypeScript.

My CV is attached. You can see my work at $web and my code at github.com/Luiiss44.

I'd love to talk about how I could contribute to your team.

Best regards,
Luis Marquina Rodríguez
$web · linkedin.com/in/luismarrod
"@
}

if (-not (Test-Path $pdf)) { throw "No encuentro el CV en $pdf. Genera los PDF con: pnpm cv" }

$enc = { param($s) [uri]::EscapeDataString($s) }
if ($Mailto) {
  Start-Process ("mailto:{0}?subject={1}&body={2}" -f $Email, (& $enc $asunto), (& $enc $cuerpo))
} else {
  Start-Process ("https://mail.google.com/mail/?view=cm&fs=1&to={0}&su={1}&body={2}" -f (& $enc $Email), (& $enc $asunto), (& $enc $cuerpo))
}
Start-Process explorer.exe "/select,`"$pdf`""

$log = Join-Path $PSScriptRoot 'candidaturas.csv'
if (-not (Test-Path $log)) { 'fecha,empresa,email,puesto,idioma,estado' | Out-File $log -Encoding utf8 }
('{0},"{1}","{2}","{3}",{4},borrador' -f (Get-Date -Format 'yyyy-MM-dd'), $Empresa, $Email, $Puesto, $Idioma) | Out-File $log -Append -Encoding utf8

Write-Host "Borrador abierto para $Empresa. Arrastra el PDF seleccionado al correo, revisa y pulsa Enviar." -ForegroundColor Green
Write-Host "Anotado en $log"

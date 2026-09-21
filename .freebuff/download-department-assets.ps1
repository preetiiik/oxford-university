$ErrorActionPreference = 'Stop'
$root = (Resolve-Path (Join-Path $PSScriptRoot '..')).Path
$dir = Join-Path $root 'src\assets\departments'
New-Item -ItemType Directory -Force -Path $dir | Out-Null
$base = 'https://www.figma.com/api/mcp/asset'

# name in src/assets/departments  ->  Figma CDN asset id (order matches src/assets.ts `departments[]`)
$map = [ordered]@{
  'bba.jpg'          = 'f6763c48-3794-4465-a0ad-374b938fd767.png'
  'bca.jpg'          = '9ce23a4c-0c75-4625-bc1f-67f9259943f0.png'
  'bcom.jpg'         = '27b8da40-fb9e-4a73-8ea0-afb8384daa57.png'
  'puc-science.jpg'  = '6f471b47-cf3c-4370-a161-a49183d3e7c9.png'
  'puc-commerce.jpg' = '77fb8584-d996-417a-96fb-8d6ee9b45fdb.png'
  'mcom.jpg'         = 'df05328d-1e97-4230-b9fe-e9f0d8efcc79.png'
  'mba.jpg'          = 'e9aaf1d6-8bd2-432e-aa2e-7d298b63186d.png'
  'mca.jpg'          = '8e8fa541-a109-4f06-8df7-31e56b482d1c.png'
}

foreach ($name in $map.Keys) {
  $out = Join-Path $dir $name
  if (Test-Path $out) { Write-Output "skip $name (exists)"; continue }
  Invoke-WebRequest -Uri "$base/$($map[$name])" -OutFile $out -UseBasicParsing
  Write-Output ("ok   {0}  {1} bytes" -f $name, (Get-Item $out).Length)
}

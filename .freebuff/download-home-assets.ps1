$ErrorActionPreference = 'Stop'
$root = (Resolve-Path (Join-Path $PSScriptRoot '..')).Path
$dir = Join-Path $root 'src\assets\home'
New-Item -ItemType Directory -Force -Path $dir | Out-Null
$base = 'https://www.figma.com/api/mcp/asset'

# name in src/assets/home  ->  Figma CDN asset id (extracted from src/assets.ts)
$map = [ordered]@{
  'logo-crest.png'       = '65b5c610-d226-4df9-8218-3710a2fee3e3.png'
  'hero-campus.jpg'      = '8ab5146f-1a6c-45dd-a2ed-de5170258467.png'
  'legacy-campus.jpg'    = '9db87316-000e-4cd4-bffe-c6a308270162.png'
  'why-library.jpg'      = '919c24c1-c4e4-4014-9300-9571b2c11fc9.png'
  'cta-library.jpg'      = '8f54e0e5-60a4-4496-bca0-8df98eba197b.png'
  'campus-library.jpg'   = '20ec85c3-d208-471d-b5dc-9646e061a300.png'
  'campus-lab.jpg'       = 'f921b26b-5f99-40a6-8e13-e3ded1623398.png'
  'campus-sports.jpg'    = '720f8f29-d20c-46c6-a2ad-0c598a20a83d.png'
  'campus-culture.jpg'   = '1fbcee3c-ebb4-4332-b89d-837f3713cdfa.png'
  'campus-cafeteria.jpg' = '099a9e30-4c3d-425e-9d08-59163b8ab546.png'
  'partner-wipro.png'    = 'f90c7679-29e3-41dc-aa00-fe3f1d12d7cd.png'
  'partner-airtel.png'   = '81c6ea97-aa89-4667-868d-a9d41eff7834.png'
  'partner-atm.png'      = '2eaf0b55-655e-4760-8043-dd16d905dd08.png'
  'partner-xentrix.png'  = 'a7d83f47-c862-43da-b726-4904426fc2d5.png'
  'partner-omega.png'    = 'ae009533-4027-4b65-b7ec-3214334528f6.png'
  'partner-itc.png'      = 'ddf8b4e0-7c7c-4e1b-8b1f-db3800bbd1b4.png'
  'partner-tata.png'     = '12722f71-3b03-4bf2-9f0a-3a29591e5edb.png'
}

foreach ($name in $map.Keys) {
  $out = Join-Path $dir $name
  if (Test-Path $out) { Write-Output "skip $name (exists)"; continue }
  Invoke-WebRequest -Uri "$base/$($map[$name])" -OutFile $out -UseBasicParsing
  Write-Output ("ok   {0}  {1} bytes" -f $name, (Get-Item $out).Length)
}

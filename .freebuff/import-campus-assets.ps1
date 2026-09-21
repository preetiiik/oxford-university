$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing
$src = 'C:\Users\lenovo\Downloads\campus-photos'
$dst = Join-Path (Split-Path -Parent $PSScriptRoot) 'src\assets\campus'
New-Item -ItemType Directory -Force -Path $dst | Out-Null

# target name -> user-supplied PNG (portrait -> student-laptop, 1.3:1 -> courtyard,
# nine 3:2 landscapes in alphabetical order -> hero, about-lab, classroom, gallery-1..6)
$map = [ordered]@{
  'hero.jpg'           = '46c46b101661c750756887109a4342fc005bfaa0.png'
  'about-lab.jpg'      = '48df916326ea62c5a09b32120d5fe7a887794212.png'
  'classroom.jpg'      = '5d3a6d47ed56d227217c6c79b11ee87b4907b8b6.png'
  'gallery-1.jpg'      = '5e9b883ddade2cbaf62a0f0cf9cd22e71aab4a00.png'
  'gallery-2.jpg'      = '9d0663bc7f3f0140d163f130be73f67d036efb27.png'
  'gallery-3.jpg'      = '9d26f130d8b0e861679210b5f33ca04acbe7cb6d.png'
  'gallery-4.jpg'      = '9da5b9569a006a8e8551e2bc002e6a06cba8495b.png'
  'gallery-5.jpg'      = 'd951654aa856286c7ca2c554402328ad58c5d36f.png'
  'gallery-6.jpg'      = 'ddfafecdc9dcce637cd80839f8093a6618e4c4e9.png'
  'courtyard.jpg'      = 'df0c4eacce6981dbc582c4b858e3f509b87ea6e1.png'
  'student-laptop.jpg' = 'd8beb0cef66378f09d84080022cd26dda376c535.png'
}

$jpegCodec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' } | Select-Object -First 1
if (-not $jpegCodec) { throw 'JPEG codec not found' }
$quality = New-Object System.Drawing.Imaging.EncoderParameters(1)
$quality.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, [long]85)

foreach ($name in $map.Keys) {
  $out = Join-Path $dst $name
  if (Test-Path $out) { Write-Output "skip $name (exists)"; continue }
  $img = [System.Drawing.Image]::FromFile((Join-Path $src $map[$name]))
  $img.Save($out, $jpegCodec, $quality)
  $img.Dispose()
  Write-Output ("ok   {0}  {1} KB" -f $name, [math]::Round((Get-Item $out).Length/1KB))
}

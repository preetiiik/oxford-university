param([Parameter(Mandatory=$true)][string]$Folder)
Add-Type -AssemblyName System.Drawing
Get-ChildItem -Path $Folder -File | ForEach-Object {
  try {
    $img = [System.Drawing.Image]::FromFile($_.FullName)
    "{0}  {1}x{2}  {3} KB" -f $_.Name, $img.Width, $img.Height, [math]::Round($_.Length/1KB)
    $img.Dispose()
  } catch { "$($_.Name)  UNREADABLE" }
}

Set-Location 'D:\PROJECTS\GITHUB\az4mary\zyne.store'
$env:OUTPUT_DIR='assets/property-listing-screenshots'
$env:DEVICE='desktop'
$env:CDP_ENDPOINT='http://127.0.0.1:9222'
$env:SLOW_SCROLL='1'
Remove-Item Env:AUTO -ErrorAction SilentlyContinue
& 'C:\Users\USER\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe' scripts/capture-property-listings-local.mjs 'https://www.har.com/homedetail/7101-wendemere-st-houston-tx-77088/11143299'
Write-Host ''
Write-Host 'Finished. Press Enter to close this window.'
Read-Host

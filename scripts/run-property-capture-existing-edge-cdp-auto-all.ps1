Set-Location 'D:\PROJECTS\GITHUB\az4mary\zyne.store'
$env:OUTPUT_DIR='assets/property-listing-screenshots'
Remove-Item Env:DEVICE -ErrorAction SilentlyContinue
$env:CDP_ENDPOINT='http://127.0.0.1:9222'
$env:SLOW_SCROLL='1'
$env:SETTLE_MS='15000'
$env:AUTO='1'
& 'C:\Users\USER\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe' scripts/capture-property-listings-local.mjs

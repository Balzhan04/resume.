param(
  [int]$Port = 8000
)

$root = (Get-Location).Path
$listener = [System.Net.Sockets.TcpListener]::new([System.Net.IPAddress]::Any, $Port)
$mimeTypes = @{
  ".html" = "text/html; charset=utf-8"
  ".css" = "text/css; charset=utf-8"
  ".js" = "application/javascript; charset=utf-8"
  ".svg" = "image/svg+xml"
  ".pdf" = "application/pdf"
  ".png" = "image/png"
  ".jpg" = "image/jpeg"
  ".jpeg" = "image/jpeg"
  ".webp" = "image/webp"
  ".ico" = "image/x-icon"
  ".txt" = "text/plain; charset=utf-8"
  ".xml" = "application/xml; charset=utf-8"
}

function Get-SafePath {
  param([string]$UrlPath)

  $path = [Uri]::UnescapeDataString(($UrlPath -split "\?")[0])
  if ([string]::IsNullOrWhiteSpace($path) -or $path -eq "/") {
    $path = "/index.html"
  }

  $relative = $path.TrimStart("/") -replace "/", [IO.Path]::DirectorySeparatorChar
  $fullPath = [IO.Path]::GetFullPath([IO.Path]::Combine($root, $relative))

  if (-not $fullPath.StartsWith($root, [StringComparison]::OrdinalIgnoreCase)) {
    return $null
  }

  return $fullPath
}

function Send-Response {
  param(
    [System.Net.Sockets.NetworkStream]$Stream,
    [int]$Status,
    [string]$StatusText,
    [byte[]]$Body,
    [string]$ContentType = "text/plain; charset=utf-8"
  )

  $header = "HTTP/1.1 $Status $StatusText`r`nContent-Length: $($Body.Length)`r`nContent-Type: $ContentType`r`nConnection: close`r`n`r`n"
  $headerBytes = [Text.Encoding]::ASCII.GetBytes($header)
  $Stream.Write($headerBytes, 0, $headerBytes.Length)
  if ($Body.Length -gt 0) {
    $Stream.Write($Body, 0, $Body.Length)
  }
}

$listener.Start()
Write-Host "Serving $root"
Write-Host "Open on this computer: http://localhost:$Port"
Write-Host "Open from another device: http://YOUR_IPV4_ADDRESS:$Port"
Write-Host "Press Ctrl+C to stop."

try {
  while ($true) {
    $client = $listener.AcceptTcpClient()
    try {
      $stream = $client.GetStream()
      $buffer = New-Object byte[] 4096
      $read = $stream.Read($buffer, 0, $buffer.Length)
      if ($read -le 0) { continue }

      $request = [Text.Encoding]::ASCII.GetString($buffer, 0, $read)
      $requestLine = ($request -split "`r?`n")[0]
      $parts = $requestLine -split " "
      $urlPath = if ($parts.Length -ge 2) { $parts[1] } else { "/" }
      $filePath = Get-SafePath $urlPath

      if ($null -eq $filePath -or -not (Test-Path -LiteralPath $filePath -PathType Leaf)) {
        $body = [Text.Encoding]::UTF8.GetBytes("404 Not Found")
        Send-Response $stream 404 "Not Found" $body
        continue
      }

      $extension = [IO.Path]::GetExtension($filePath).ToLowerInvariant()
      $contentType = if ($mimeTypes.ContainsKey($extension)) { $mimeTypes[$extension] } else { "application/octet-stream" }
      $bodyBytes = [IO.File]::ReadAllBytes($filePath)
      Send-Response $stream 200 "OK" $bodyBytes $contentType
    }
    finally {
      $client.Close()
    }
  }
}
finally {
  $listener.Stop()
}

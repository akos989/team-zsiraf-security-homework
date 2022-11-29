Param($MigrationName)

if ($null -eq $MigrationName) {
    $MigrationName = Read-Host "Enter a migration name";
}

dotnet ef migrations add "$MigrationName" -s ..\ZsirafWebShop.Api\
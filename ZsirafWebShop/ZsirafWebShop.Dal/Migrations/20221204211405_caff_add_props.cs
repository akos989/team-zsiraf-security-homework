using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ZsirafWebShop.Dal.Migrations
{
    public partial class caff_add_props : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "GifRef",
                table: "Caffs",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "OriginalFileName",
                table: "Caffs",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "7f1537e8-7143-4dca-97a7-7a8101a6f5ed", "AQAAAAEAACcQAAAAEPaU/q/zQ8OB9iiIVlgs7x6zt1Mra6Ripv+3aBP1rj6Lm5U4JelBfrq5BiVR12X7eg==" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "GifRef",
                table: "Caffs");

            migrationBuilder.DropColumn(
                name: "OriginalFileName",
                table: "Caffs");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "03ab6c36-c900-4c57-ad42-eaff9a124851", "AQAAAAEAACcQAAAAEGbd6c66ck0wPz84z4NU+0ObLf0HbHJewuA9U2OwHMTJRARKtnYWavkP94xL5Un9AA==" });
        }
    }
}

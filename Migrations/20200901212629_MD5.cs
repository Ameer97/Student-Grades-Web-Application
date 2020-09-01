using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Ammar.Migrations
{
    public partial class MD5 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "GuId",
                table: "Students",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uuid");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<Guid>(
                name: "GuId",
                table: "Students",
                type: "uuid",
                nullable: false,
                oldClrType: typeof(string),
                oldNullable: true);
        }
    }
}

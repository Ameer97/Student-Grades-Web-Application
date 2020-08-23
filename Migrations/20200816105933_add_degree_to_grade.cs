using Microsoft.EntityFrameworkCore.Migrations;

namespace Ammar.Migrations
{
    public partial class add_degree_to_grade : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<double>(
                name: "Degree",
                table: "Grades",
                nullable: false,
                defaultValue: 0.0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Degree",
                table: "Grades");
        }
    }
}

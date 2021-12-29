using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace API_Forum.Migrations
{
    public partial class init : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Tb_M_Category",
                columns: table => new
                {
                    CategoryId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CategoryName = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tb_M_Category", x => x.CategoryId);
                });

            migrationBuilder.CreateTable(
                name: "Tb_M_Role",
                columns: table => new
                {
                    RoleId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RoleName = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tb_M_Role", x => x.RoleId);
                });

            migrationBuilder.CreateTable(
                name: "Tb_M_TypeDiscussion",
                columns: table => new
                {
                    TypeId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TypeName = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tb_M_TypeDiscussion", x => x.TypeId);
                });

            migrationBuilder.CreateTable(
                name: "Tb_M_User",
                columns: table => new
                {
                    UserId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FirstName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LastName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Gender = table.Column<int>(type: "int", nullable: false),
                    BirthDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Phone = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Status = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tb_M_User", x => x.UserId);
                });

            migrationBuilder.CreateTable(
                name: "Tb_T_Account",
                columns: table => new
                {
                    UserId = table.Column<int>(type: "int", nullable: false),
                    Password = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tb_T_Account", x => x.UserId);
                    table.ForeignKey(
                        name: "FK_Tb_T_Account_Tb_M_User_UserId",
                        column: x => x.UserId,
                        principalTable: "Tb_M_User",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Tb_T_Discussion",
                columns: table => new
                {
                    DisId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Content = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DateDis = table.Column<DateTime>(type: "datetime2", nullable: false),
                    StatusComt = table.Column<int>(type: "int", nullable: false),
                    Views = table.Column<int>(type: "int", nullable: false),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    CategoryId = table.Column<int>(type: "int", nullable: false),
                    TypeId = table.Column<int>(type: "int", nullable: false),
                    Status = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tb_T_Discussion", x => x.DisId);
                    table.ForeignKey(
                        name: "FK_Tb_T_Discussion_Tb_M_Category_CategoryId",
                        column: x => x.CategoryId,
                        principalTable: "Tb_M_Category",
                        principalColumn: "CategoryId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Tb_T_Discussion_Tb_M_TypeDiscussion_TypeId",
                        column: x => x.TypeId,
                        principalTable: "Tb_M_TypeDiscussion",
                        principalColumn: "TypeId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Tb_T_Discussion_Tb_M_User_UserId",
                        column: x => x.UserId,
                        principalTable: "Tb_M_User",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Tb_T_AccountRole",
                columns: table => new
                {
                    UserId = table.Column<int>(type: "int", nullable: false),
                    RoleId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tb_T_AccountRole", x => new { x.UserId, x.RoleId });
                    table.ForeignKey(
                        name: "FK_Tb_T_AccountRole_Tb_M_Role_RoleId",
                        column: x => x.RoleId,
                        principalTable: "Tb_M_Role",
                        principalColumn: "RoleId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Tb_T_AccountRole_Tb_T_Account_UserId",
                        column: x => x.UserId,
                        principalTable: "Tb_T_Account",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Tb_T_Comment",
                columns: table => new
                {
                    CommentId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Content = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DateComment = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    DisId = table.Column<int>(type: "int", nullable: false),
                    Status = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tb_T_Comment", x => x.CommentId);
                    table.ForeignKey(
                        name: "FK_Tb_T_Comment_Tb_M_User_UserId",
                        column: x => x.UserId,
                        principalTable: "Tb_M_User",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Tb_T_Comment_Tb_T_Discussion_DisId",
                        column: x => x.DisId,
                        principalTable: "Tb_T_Discussion",
                        principalColumn: "DisId",
                        onDelete: ReferentialAction.NoAction);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Tb_T_AccountRole_RoleId",
                table: "Tb_T_AccountRole",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "IX_Tb_T_Comment_DisId",
                table: "Tb_T_Comment",
                column: "DisId");

            migrationBuilder.CreateIndex(
                name: "IX_Tb_T_Comment_UserId",
                table: "Tb_T_Comment",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Tb_T_Discussion_CategoryId",
                table: "Tb_T_Discussion",
                column: "CategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_Tb_T_Discussion_TypeId",
                table: "Tb_T_Discussion",
                column: "TypeId");

            migrationBuilder.CreateIndex(
                name: "IX_Tb_T_Discussion_UserId",
                table: "Tb_T_Discussion",
                column: "UserId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Tb_T_AccountRole");

            migrationBuilder.DropTable(
                name: "Tb_T_Comment");

            migrationBuilder.DropTable(
                name: "Tb_M_Role");

            migrationBuilder.DropTable(
                name: "Tb_T_Account");

            migrationBuilder.DropTable(
                name: "Tb_T_Discussion");

            migrationBuilder.DropTable(
                name: "Tb_M_Category");

            migrationBuilder.DropTable(
                name: "Tb_M_TypeDiscussion");

            migrationBuilder.DropTable(
                name: "Tb_M_User");
        }
    }
}

using API_Forum.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API_Forum.Context
{
    public class MyContext : DbContext
    {
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseLazyLoadingProxies();
        }

        public MyContext(DbContextOptions<MyContext> option) : base(option)
        {

        }

        public DbSet<User> Users { get; set; }

        public DbSet<Account> Accounts { get; set; }

        public DbSet<Comment> Comments { get; set; }

        public DbSet<Discussion> Discussions { get; set; }

        public DbSet<Category> Categories { get; set; }

        public DbSet<TypeDiscussion> TypeDiscussions { get; set; }

        public DbSet<AccountRole> AccountRoles { get; set; }

        public DbSet<Role> Roles { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Relasi User Dan Account
            modelBuilder.Entity<User>()
                .HasOne(ac => ac.Account)
                .WithOne(us => us.User)
                .HasForeignKey<Account>(us => us.UserId);

            // Relasi User dan Comment
            modelBuilder.Entity<User>()
                .HasMany(co => co.Comments)
                .WithOne(us => us.User);

            // Relasi User dan Discussion
            modelBuilder.Entity<User>()
                .HasMany(dis => dis.Discussions)
                .WithOne(us => us.User);

            // Relasi Discussion dan Comment
            modelBuilder.Entity<Discussion>()
                .HasMany(co => co.Comments)
                .WithOne(dis => dis.Discussion);

            // Relasi Discussion dan Category
            modelBuilder.Entity<Category>()
                .HasMany(dis => dis.Discussions)
                .WithOne(ca => ca.Category);

            // Relasi Discussion dan TypeDiscussion
            modelBuilder.Entity<TypeDiscussion>()
                .HasMany(dis => dis.Discussions)
                .WithOne(tdi => tdi.TypeDiscussion);

            // Memanggil 2 PK AccountRole ke Account dan Role
            modelBuilder.Entity<AccountRole>()
                .HasKey(acr => new { acr.UserId, acr.RoleId });

            // Relasi Account dan AccountRole
            modelBuilder.Entity<AccountRole>()
                .HasOne(ac => ac.Account)
                .WithMany(acr => acr.AccountRoles)
                .HasForeignKey(acr => acr.UserId);

            // Relasi Role dan AccountRole
            modelBuilder.Entity<AccountRole>()
                .HasOne(ro => ro.Role)
                .WithMany(acr => acr.AccountRoles)
                .HasForeignKey(acr => acr.RoleId);
        }
    }
}

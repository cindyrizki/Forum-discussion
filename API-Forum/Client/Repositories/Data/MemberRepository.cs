using API_Forum.Models;
using Client.Base.Urls;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;

namespace Client.Repositories.Data
{
    public class MemberRepository : GeneralRepository<User, int>
    {
        private readonly Address address;
        private readonly HttpClient httpClient;
        private readonly string request;

        public MemberRepository(Address address, string request = "Users/") : base(address, request)
        {
            this.address = address;
            this.request = request;
            httpClient = new HttpClient
            {
                BaseAddress = new Uri(address.link)
            };
        }
    }
}

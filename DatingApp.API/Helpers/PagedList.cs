using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace DatingApp.API.Helpers
{
    public class PagedList<T> : List<T>
    {
        public int CurrentPage { get; set; }
        public int TotalPages { get; set; }
        public int PageSize { get; set; }
        public int TotalCount { get; set; }

        public PagedList(List<T> item, int pageSize, int count, int pageNumber)
        {
            this.PageSize = pageSize;
            this.TotalCount = count;
            this.CurrentPage = pageNumber;
            this.TotalPages = (int)Math.Ceiling(count/(double) pageSize);
            this.AddRange(item);
        }
        public static async Task<PagedList<T>> CreateAsync(IQueryable<T> source, int pageNumber, int pageSize)
        {
            var count = await source.CountAsync();
            var item = await source.Skip((pageNumber - 1) * pageSize).Take(pageSize).ToListAsync();
            return new PagedList<T>(item, pageSize, count, pageNumber);
        }


    }
}
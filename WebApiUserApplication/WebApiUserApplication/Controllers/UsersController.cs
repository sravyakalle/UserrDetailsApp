using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Net;
using WebApiUserApplication.Data;
using WebApiUserApplication.Models;

namespace WebApiUserApplication.Controllers
{
    [ApiController]
    [Route("/api/[controller]")]
    public class UsersController : Controller
    {
        private readonly UserListDbContext _userListDbContext;

        public UsersController(UserListDbContext userListDbContext)
        {
            this._userListDbContext = userListDbContext;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllUsers()
        {
            var user = await _userListDbContext.UserDetails.ToListAsync();

            return Ok(user);
        }

        [HttpPost]
        public async Task<IActionResult> AddUser([FromBody] UserDetailsList newUser)
        {
            //newUser.Id = Guid.NewGuid();
            var userdetailList = (from usr in _userListDbContext.UserDetails
                                  where usr.UserName == newUser.UserName
                                  select usr).FirstOrDefault();
            if (userdetailList == null)
            {
                await _userListDbContext.UserDetails.AddAsync(newUser);
                await _userListDbContext.SaveChangesAsync();

            }
            else
            {
                return NotFound();
            }
            return Ok(newUser);
            CreatedAtAction(nameof(GetUser), new { id = newUser.Id }, newUser);
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<IActionResult> GetUser(long id)
        {
            var user = await _userListDbContext.UserDetails.FirstOrDefaultAsync(x => x.Id == id);

            if (user == null)
                return NotFound();

            return Ok(user);
        }

        [HttpPut]
        [Route("{id}")]
        public async Task<IActionResult> UpdateUser([FromRoute] long id, UserDetailsList updateUserRequest)
        {
            var user = await _userListDbContext.UserDetails.FindAsync(id);

            if (user == null)
                return NotFound();

            user.UserName = updateUserRequest.UserName;
            user.FirstName = updateUserRequest.FirstName;
            user.LastName = updateUserRequest.LastName;
            user.Email = updateUserRequest.Email;
            user.Status = updateUserRequest.Status;
            user.Department = updateUserRequest.Department;

            await _userListDbContext.SaveChangesAsync();

            return Ok(user);
        }

        [HttpDelete]
        [Route("{id}")]
        public async Task<IActionResult> DeleteUser(long id)
        {
            var user = await _userListDbContext.UserDetails.FindAsync(id);

            if (user == null)
                return NotFound();

            _userListDbContext.UserDetails.Remove(user);
            await _userListDbContext.SaveChangesAsync();

            return Ok(user);
        }
    }
}
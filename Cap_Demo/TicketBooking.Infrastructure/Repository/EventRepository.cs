﻿using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using TicketBooking.Application.Features.Interface;
using TicketBooking.Demo;
using TicketBooking.Infrastructure.Context;

namespace TicketBooking.Infrastructure.Repository
{
    public class EventRepository : IEventRepository
    {
        private readonly TicketBookingContext _context;

        public EventRepository(TicketBookingContext context)
        {
            _context = context;
        }

        // Add a new event
        public async Task<Event> AddEvent(Event _event)
        {
            _context.Events.Add(_event);
            await _context.SaveChangesAsync();
            return _event;
        }

        public async Task<Event> UpdateEvent(Event _event)
        {
            _context.Events.Update(_event); // Marks the entity for update
            await _context.SaveChangesAsync(); // Persists the changes
            return _event;
        }


        // Delete an event by ID
        public async Task<bool> DeleteEvent(int id)
        {
            var eventToDelete = await _context.Events.FindAsync(id);
            if (eventToDelete != null)
            {
                _context.Events.Remove(eventToDelete);
                await _context.SaveChangesAsync();
                return true;
            }
            return false;
        }

        // Get a specific event by ID
        public async Task<Event> GetEventById(int id)
        {
            return await _context.Events.FirstOrDefaultAsync(e => e.Id == id);
        }

        // Get all events
        public async Task<IEnumerable<Event>> GetEvents()
        {
            return await _context.Events.ToListAsync();
        }
    }
}

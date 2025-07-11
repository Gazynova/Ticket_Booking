using TicketBooking.Demo;

namespace TicketBooking.Application.Features.Interface
{
    public interface IEventRepository
    {
        Task<Event> AddEvent(Event _event);
        Task<bool> DeleteEvent(int id);
        Task<Event> GetEventById(int id);
        Task<IEnumerable<Event>> GetEvents();
        Task<Event> UpdateEvent(Event _event);
    }
}
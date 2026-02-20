import { useState } from 'react';
import { motion } from 'motion/react';
import { X, Calendar as CalendarIcon, Plus, Check, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';
import { GameState, CalendarEvent } from '../types';

interface CalendarScreenProps {
  state: GameState;
  onClose: () => void;
  onAddEvent: (title: string, date: string, description?: string) => void;
  onToggleCompletion: (id: string) => void;
  onDeleteEvent: (id: string) => void;
}

export function CalendarScreen({ state, onClose, onAddEvent, onToggleCompletion, onDeleteEvent }: CalendarScreenProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isAddingEvent, setIsAddingEvent] = useState(false);
  const [newEventTitle, setNewEventTitle] = useState('');
  const [newEventDate, setNewEventDate] = useState(new Date().toISOString().split('T')[0]);
  const [newEventDesc, setNewEventDesc] = useState('');

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newEventTitle.trim() && newEventDate) {
      onAddEvent(newEventTitle.trim(), newEventDate, newEventDesc.trim());
      setIsAddingEvent(false);
      setNewEventTitle('');
      setNewEventDesc('');
    }
  };

  const getEventsForDay = (day: number) => {
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return state.calendar.events.filter(e => e.date === dateStr);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex flex-col p-4 md:p-8 overflow-hidden"
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-serif text-blue-200 flex items-center gap-3">
          <CalendarIcon className="w-6 h-6" />
          Time & Seasons
        </h2>
        <button 
          onClick={onClose}
          className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
        >
          <X className="w-6 h-6 text-white/70" />
        </button>
      </div>

      <div className="flex-1 flex flex-col md:flex-row gap-8 overflow-hidden">
        {/* Calendar Grid */}
        <div className="flex-1 bg-white/5 rounded-2xl p-6 overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <button onClick={handlePrevMonth} className="p-2 hover:bg-white/10 rounded-full transition-colors">
              <ChevronLeft className="w-5 h-5 text-white/70" />
            </button>
            <h3 className="text-xl font-serif text-white/90">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h3>
            <button onClick={handleNextMonth} className="p-2 hover:bg-white/10 rounded-full transition-colors">
              <ChevronRight className="w-5 h-5 text-white/70" />
            </button>
          </div>

          <div className="grid grid-cols-7 gap-2 mb-2 text-center text-white/40 text-sm uppercase tracking-wider">
            <div>Sun</div><div>Mon</div><div>Tue</div><div>Wed</div><div>Thu</div><div>Fri</div><div>Sat</div>
          </div>
          
          <div className="grid grid-cols-7 gap-2">
            {[...Array(firstDayOfMonth)].map((_, i) => (
              <div key={`empty-${i}`} className="aspect-square" />
            ))}
            {[...Array(daysInMonth)].map((_, i) => {
              const day = i + 1;
              const events = getEventsForDay(day);
              const isToday = new Date().toDateString() === new Date(currentDate.getFullYear(), currentDate.getMonth(), day).toDateString();
              
              return (
                <div 
                  key={day} 
                  className={`aspect-square rounded-lg border border-white/5 p-2 relative group hover:bg-white/5 transition-colors ${isToday ? 'bg-blue-500/20 border-blue-500/30' : ''}`}
                >
                  <span className={`text-sm ${isToday ? 'text-blue-200 font-bold' : 'text-white/70'}`}>{day}</span>
                  <div className="flex flex-col gap-1 mt-1">
                    {events.map(event => (
                      <div 
                        key={event.id} 
                        className={`w-full h-1.5 rounded-full ${event.isCompleted ? 'bg-green-500/50' : 'bg-orange-400/70'}`} 
                        title={event.title}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Event List & Add Form */}
        <div className="w-full md:w-80 flex flex-col gap-6">
          <div className="bg-white/5 rounded-2xl p-6 flex-1 overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-serif text-white/80">Upcoming</h3>
              <button 
                onClick={() => setIsAddingEvent(!isAddingEvent)}
                className="p-2 rounded-full bg-blue-500/20 hover:bg-blue-500/30 text-blue-200 transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {isAddingEvent && (
              <form onSubmit={handleAddSubmit} className="mb-6 space-y-3 bg-black/20 p-4 rounded-xl border border-white/10">
                <input
                  type="text"
                  value={newEventTitle}
                  onChange={(e) => setNewEventTitle(e.target.value)}
                  placeholder="Event title..."
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-400/50"
                  autoFocus
                />
                <input
                  type="date"
                  value={newEventDate}
                  onChange={(e) => setNewEventDate(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-400/50"
                />
                <textarea
                  value={newEventDesc}
                  onChange={(e) => setNewEventDesc(e.target.value)}
                  placeholder="Description (optional)..."
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-400/50 resize-none h-20"
                />
                <div className="flex justify-end gap-2">
                  <button 
                    type="button" 
                    onClick={() => setIsAddingEvent(false)}
                    className="px-3 py-1.5 text-xs text-white/50 hover:text-white transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    disabled={!newEventTitle.trim()}
                    className="px-3 py-1.5 bg-blue-500/20 hover:bg-blue-500/30 text-blue-200 text-xs rounded-lg transition-colors disabled:opacity-50"
                  >
                    Add
                  </button>
                </div>
              </form>
            )}

            <div className="space-y-3">
              {state.calendar.events
                .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                .map(event => (
                <div 
                  key={event.id} 
                  className={`p-3 rounded-xl border transition-all ${
                    event.isCompleted 
                      ? 'bg-green-900/10 border-green-500/20 opacity-60' 
                      : 'bg-white/5 border-white/10 hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <button 
                      onClick={() => onToggleCompletion(event.id)}
                      className={`mt-1 w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                        event.isCompleted 
                          ? 'bg-green-500/20 border-green-500/50 text-green-400' 
                          : 'border-white/30 hover:border-white/60'
                      }`}
                    >
                      {event.isCompleted && <Check className="w-3 h-3" />}
                    </button>
                    <div className="flex-1 min-w-0">
                      <div className={`text-sm font-medium truncate ${event.isCompleted ? 'line-through text-white/50' : 'text-white/90'}`}>
                        {event.title}
                      </div>
                      <div className="text-xs text-white/40 mt-0.5">
                        {new Date(event.date).toLocaleDateString()}
                      </div>
                      {event.description && (
                        <div className="text-xs text-white/60 mt-2 leading-relaxed">
                          {event.description}
                        </div>
                      )}
                    </div>
                    <button 
                      onClick={() => onDeleteEvent(event.id)}
                      className="text-white/20 hover:text-red-400 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
              {state.calendar.events.length === 0 && !isAddingEvent && (
                <div className="text-center text-white/30 text-sm py-8 italic">
                  No events planned yet...
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

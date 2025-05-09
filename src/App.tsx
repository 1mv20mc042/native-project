import React, { useState, useEffect } from 'react';
import { Timer, Clock, Plus, Play, Pause, RotateCcw } from 'lucide-react';

interface TimerData {
  id: string;
  name: string;
  duration: number;
  category: string;
  remaining: number;
  status: 'idle' | 'running' | 'paused' | 'completed';
}

function App() {
  const [timers, setTimers] = useState<TimerData[]>([]);
  const [showNewTimer, setShowNewTimer] = useState(false);
  const [showCompletionModal, setShowCompletionModal] = useState<TimerData | null>(null);
  const [newTimer, setNewTimer] = useState({
    name: '',
    duration: 0,
    category: ''
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setTimers(currentTimers => 
        currentTimers.map(timer => {
          if (timer.status !== 'running') return timer;
          
          const newRemaining = timer.remaining - 1;
          if (newRemaining <= 0) {
            setShowCompletionModal(timer);
            return { ...timer, remaining: 0, status: 'completed' };
          }
          return { ...timer, remaining: newRemaining };
        })
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const addTimer = () => {
    const timer: TimerData = {
      id: Date.now().toString(),
      name: newTimer.name,
      duration: newTimer.duration,
      category: newTimer.category,
      remaining: newTimer.duration,
      status: 'idle'
    };
    setTimers([...timers, timer]);
    setNewTimer({ name: '', duration: 0, category: '' });
    setShowNewTimer(false);
  };

  const startTimer = (id: string) => {
    setTimers(timers.map(timer => 
      timer.id === id ? { ...timer, status: 'running' } : timer
    ));
  };

  const pauseTimer = (id: string) => {
    setTimers(timers.map(timer => 
      timer.id === id ? { ...timer, status: 'paused' } : timer
    ));
  };

  const resetTimer = (id: string) => {
    setTimers(timers.map(timer => 
      timer.id === id ? { ...timer, remaining: timer.duration, status: 'idle' } : timer
    ));
  };

  const startCategory = (category: string) => {
    setTimers(timers.map(timer => 
      timer.category === category && timer.status !== 'completed' 
        ? { ...timer, status: 'running' } 
        : timer
    ));
  };

  const pauseCategory = (category: string) => {
    setTimers(timers.map(timer => 
      timer.category === category && timer.status === 'running' 
        ? { ...timer, status: 'paused' } 
        : timer
    ));
  };

  const resetCategory = (category: string) => {
    setTimers(timers.map(timer => 
      timer.category === category 
        ? { ...timer, remaining: timer.duration, status: 'idle' } 
        : timer
    ));
  };

  const categories = [...new Set(timers.map(timer => timer.category))];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
      <header className="py-6 px-8 flex justify-between items-center">
        <div className="text-white font-semibold text-xl flex items-center gap-2">
          <Timer className="w-6 h-6" />
          Timer App
        </div>
      </header>

      <main className="container mx-auto px-8 py-16">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">My Timers</h1>
          <button
            onClick={() => setShowNewTimer(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            New Timer
          </button>
        </div>

        {showNewTimer && (
          <div className="bg-gray-800 p-6 rounded-xl mb-8">
            <h2 className="text-xl font-semibold text-white mb-4">Create New Timer</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-300 mb-2">Timer Name</label>
                <input
                  type="text"
                  value={newTimer.name}
                  onChange={(e) => setNewTimer({ ...newTimer, name: e.target.value })}
                  className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg"
                  placeholder="Enter timer name"
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Duration (seconds)</label>
                <input
                  type="number"
                  value={newTimer.duration}
                  onChange={(e) => setNewTimer({ ...newTimer, duration: parseInt(e.target.value) })}
                  className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg"
                  placeholder="Enter duration in seconds"
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2">Category</label>
                <input
                  type="text"
                  value={newTimer.category}
                  onChange={(e) => setNewTimer({ ...newTimer, category: e.target.value })}
                  className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg"
                  placeholder="Enter category"
                />
              </div>
              <div className="flex gap-4">
                <button
                  onClick={addTimer}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                >
                  Add Timer
                </button>
                <button
                  onClick={() => setShowNewTimer(false)}
                  className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {categories.map(category => (
          <div key={category} className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold text-white">{category}</h2>
              <div className="flex gap-2">
                <button
                  onClick={() => startCategory(category)}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  Start All
                </button>
                <button
                  onClick={() => pauseCategory(category)}
                  className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  Pause All
                </button>
                <button
                  onClick={() => resetCategory(category)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  Reset All
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {timers.filter(timer => timer.category === category).map(timer => (
                <div key={timer.id} className="bg-gray-800 p-6 rounded-xl">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-white">{timer.name}</h3>
                      <span className="text-gray-400">{timer.category}</span>
                    </div>
                    <Clock className="w-5 h-5 text-blue-500" />
                  </div>
                  <div className="mb-4">
                    <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-500 transition-all duration-300"
                        style={{ width: `${(timer.remaining / timer.duration) * 100}%` }}
                      ></div>
                    </div>
                    <div className="mt-2 text-center text-gray-300">
                      {timer.remaining} seconds remaining
                    </div>
                  </div>
                  <div className="flex justify-center gap-4">
                    {timer.status !== 'running' && timer.status !== 'completed' ? (
                      <button
                        onClick={() => startTimer(timer.id)}
                        className="text-green-500 hover:text-green-400 transition-colors"
                      >
                        <Play className="w-6 h-6" />
                      </button>
                    ) : timer.status === 'running' ? (
                      <button
                        onClick={() => pauseTimer(timer.id)}
                        className="text-yellow-500 hover:text-yellow-400 transition-colors"
                      >
                        <Pause className="w-6 h-6" />
                      </button>
                    ) : null}
                    <button
                      onClick={() => resetTimer(timer.id)}
                      className="text-blue-500 hover:text-blue-400 transition-colors"
                    >
                      <RotateCcw className="w-6 h-6" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {showCompletionModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-gray-800 p-8 rounded-xl max-w-md w-full mx-4">
              <h2 className="text-2xl font-bold text-white mb-4">Timer Completed! 🎉</h2>
              <p className="text-gray-300 mb-6">
                Congratulations! Your timer "{showCompletionModal.name}" has finished.
              </p>
              <button
                onClick={() => setShowCompletionModal(null)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
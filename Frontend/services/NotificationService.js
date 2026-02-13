class NotificationService {
  constructor() {
    this.socket = null;
    this.listeners = [];
    this.notificationHistory = [];
    this.audioContext = null;
    this.isConnected = false;
  }

  connect(url = 'ws://localhost:5000') {
    try {
      this.socket = new WebSocket(url);

      this.socket.onopen = () => {
        console.log('WebSocket connected');
        this.isConnected = true;
        this.notifyListeners({ type: 'connection', status: 'connected' });
      };

      this.socket.onmessage = (event) => {
        try {
          const notification = JSON.parse(event.data);
          this.handleIncomingNotification(notification);
        } catch (error) {
          console.error('Error parsing notification:', error);
        }
      };

      this.socket.onerror = (error) => {
        console.error('WebSocket error:', error);
        this.notifyListeners({ type: 'connection', status: 'error', error });
      };

      this.socket.onclose = () => {
        console.log('WebSocket disconnected');
        this.isConnected = false;
        this.notifyListeners({ type: 'connection', status: 'disconnected' });
        setTimeout(() => this.connect(url), 5000);
      };
    } catch (error) {
      console.error('Failed to connect:', error);
    }
  }

  handleIncomingNotification(notification) {
    const notificationWithId = {
      ...notification,
      id: notification.id || Date.now(),
      timestamp: notification.timestamp || new Date().toISOString(),
      read: false
    };

    this.notificationHistory.unshift(notificationWithId);

    if (this.notificationHistory.length > 100) {
      this.notificationHistory = this.notificationHistory.slice(0, 100);
    }

    if (notification.type === 'emergency' || notification.priority === 'high') {
      this.playEmergencySound();
    } else if (notification.playSound) {
      this.playNotificationSound();
    }

    this.notifyListeners(notificationWithId);
  }

  subscribe(callback) {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter(listener => listener !== callback);
    };
  }

  notifyListeners(notification) {
    this.listeners.forEach(listener => {
      try {
        listener(notification);
      } catch (error) {
        console.error('Error in listener:', error);
      }
    });
  }

  initializeAudio() {
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
  }

  playEmergencySound() {
    this.initializeAudio();
    const now = this.audioContext.currentTime;
    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    oscillator.frequency.setValueAtTime(800, now);
    oscillator.frequency.exponentialRampToValueAtTime(1200, now + 0.3);
    gainNode.gain.setValueAtTime(0.3, now);
    gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.3);

    oscillator.start(now);
    oscillator.stop(now + 0.3);
  }

  playNotificationSound() {
    this.initializeAudio();
    const now = this.audioContext.currentTime;
    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    oscillator.frequency.setValueAtTime(600, now);
    gainNode.gain.setValueAtTime(0.2, now);
    gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.3);

    oscillator.start(now);
    oscillator.stop(now + 0.3);
  }

  markAsRead(notificationId) {
    const notification = this.notificationHistory.find(n => n.id === notificationId);
    if (notification) {
      notification.read = true;
    }
  }

  markAllAsRead() {
    this.notificationHistory.forEach(n => n.read = true);
  }

  getUnreadCount() {
    return this.notificationHistory.filter(n => !n.read).length;
  }

  getHistory() {
    return this.notificationHistory;
  }

  clearHistory() {
    this.notificationHistory = [];
  }

  disconnect() {
    if (this.socket) {
      this.socket.close();
      this.socket = null;
    }
  }
}

const notificationService = new NotificationService();
export default notificationService;
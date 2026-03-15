import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import './Profile.css';
import { Bell, Settings, User, Rocket, Mail, Calendar, Edit2, LogOut, LayoutDashboard } from 'lucide-react';

// Mock data for upcoming updates
const updates = [
  { id: 1, title: "v2.0 Beta Release", date: "Coming Mar 25", description: "Introducing AI-powered code suggestions and deeper VS Code integration.", type: "Major" },
  { id: 2, title: "Theme Customization", date: "Coming Apr 02", description: "New glassmorphic themes and layout controls for your landing pages.", type: "Feature" },
  { id: 3, title: "Performance Patch", date: "Coming Apr 10", description: "Reducing load times by 40% with better asset compression.", type: "Fix" }
];

const otherExtensions = [
  { id: 'ext1', title: "CodeFlow AI", description: "Automate your pull request reviews with advanced AI reasoning.", icon: "🌊", users: "15k+", rating: 4.9 },
  { id: 'ext2', title: "GitLog Pro", description: "Visualize your git history like never before with interactive timelines.", icon: "📊", users: "8k+", rating: 4.8 },
  { id: 'ext3', title: "StyleSync", description: "Synchronize your CSS variables across multiple projects and teams.", icon: "🎨", users: "12k+", rating: 4.7 },
  { id: 'ext4', title: "BugTracker X", description: "Real-time bug reporting and session replay for your React apps.", icon: "🐛", users: "5k+", rating: 4.9 }
];

const myExtensions = [
  { id: 'ext5', title: "TaskMaster", description: "The ultimate productivity extension for developers.", icon: "✅", version: "v1.4.2", status: "Active" },
  { id: 'ext6', title: "DevPalette", description: "Extract color schemes from any website instantly.", icon: "🌈", version: "v2.1.0", status: "Update Available" }
];

const Profile = () => {
  const { currentUser, userData, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('updates');

  useEffect(() => {
    console.log("Profile: Component mounted");
    console.log("Profile: currentUser:", currentUser);
    console.log("Profile: userData:", userData);
  }, [currentUser, userData]);

  if (!currentUser) {
    console.log("Profile: No currentUser, rendering null (should have been caught by PrivateRoute)");
    return null;
  }

  console.log("Profile: Rendering content for:", currentUser.email);

  return (
    <div className="profile-container">
      <div className="profile-sidebar">
        <div className="profile-nav-header">
          <div className="profile-avatar-large">
            {currentUser.displayName?.[0] || <User size={32} />}
          </div>
          <h3>{currentUser.displayName || userData?.username || 'User'}</h3>
          <p>{currentUser.email}</p>
        </div>
        
        <nav className="profile-nav">
          <button 
            className={`profile-nav-item ${activeTab === 'updates' ? 'active' : ''}`}
            onClick={() => setActiveTab('updates')}
          >
            <Bell size={18} />
            <span>Upcoming Updates</span>
            <span className="badge">3</span>
          </button>
          <button 
            className={`profile-nav-item ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            <User size={18} />
            <span>My Profile</span>
          </button>
          <button 
            className={`profile-nav-item ${activeTab === 'my-extensions' ? 'active' : ''}`}
            onClick={() => setActiveTab('my-extensions')}
          >
            <LayoutDashboard size={18} />
            <span>My Extensions</span>
          </button>
          <button 
            className={`profile-nav-item ${activeTab === 'explore' ? 'active' : ''}`}
            onClick={() => setActiveTab('explore')}
          >
            <Rocket size={18} />
            <span>Explore Extensions</span>
          </button>
          <button 
            className={`profile-nav-item ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => setActiveTab('settings')}
          >
            <Settings size={18} />
            <span>Account Settings</span>
          </button>
        </nav>

        <button className="logout-btn" onClick={logout}>
          <LogOut size={18} />
          <span>Sign Out</span>
        </button>
      </div>

      <main className="profile-content">
        <header className="content-header">
          <h1>
            {activeTab === 'updates' ? 'Upcoming Updates' : 
             activeTab === 'profile' ? 'My Profile' : 
             activeTab === 'my-extensions' ? 'My Extensions' : 
             activeTab === 'explore' ? 'Explore Extensions' : 'Settings'}
          </h1>
          <div className="header-actions">
            <button className="icon-btn"><Bell size={20} /></button>
            <div className="profile-small-avatar">
              {currentUser.displayName?.[0] || 'U'}
            </div>
          </div>
        </header>

        <div className="content-body">
          {activeTab === 'updates' && (
            <div className="updates-grid">
              {updates.map(update => (
                <div key={update.id} className="update-card">
                  <div className="update-header">
                    <span className={`update-badge ${update.type.toLowerCase()}`}>{update.type}</span>
                    <span className="update-date"><Calendar size={14} /> {update.date}</span>
                  </div>
                  <h3>{update.title}</h3>
                  <p>{update.description}</p>
                  <button className="learn-more-btn">
                    Details <Rocket size={14} />
                  </button>
                </div>
              ))}
              
              <div className="update-card placeholder">
                <div className="placeholder-content">
                  <Bell size={32} />
                  <p>More updates coming soon</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'profile' && (
            <div className="profile-details-card">
              <div className="card-section">
                <div className="section-header">
                  <h2>Account Information</h2>
                  <button className="edit-btn"><Edit2 size={14} /> Edit</button>
                </div>
                <div className="detail-row">
                  <label>Full Name</label>
                  <span>{currentUser.displayName || 'Not Set'}</span>
                </div>
                <div className="detail-row">
                  <label>Email Address</label>
                  <span>{currentUser.email}</span>
                </div>
                <div className="detail-row">
                  <label>Member Since</label>
                  <span>{new Date(currentUser.metadata.creationTime).toLocaleDateString()}</span>
                </div>
              </div>
              
              <div className="card-section">
                <h2>Product Statistics</h2>
                <div className="stats-grid">
                  <div className="stat-box">
                    <span className="stat-value">12</span>
                    <span className="stat-label">Projects</span>
                  </div>
                  <div className="stat-box">
                    <span className="stat-value">84</span>
                    <span className="stat-label">Deployments</span>
                  </div>
                  <div className="stat-box">
                    <span className="stat-value">4.2k</span>
                    <span className="stat-label">Visitors</span>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'explore' && (
            <div className="explore-grid">
              {otherExtensions.map(ext => (
                <div key={ext.id} className="explore-card">
                  <div className="explore-icon">{ext.icon}</div>
                  <div className="explore-details">
                    <div className="explore-info-header">
                      <h3>{ext.title}</h3>
                      <div className="explore-rating">★ {ext.rating}</div>
                    </div>
                    <p>{ext.description}</p>
                    <div className="explore-footer">
                      <span className="user-count">
                        <User size={14} /> {ext.users} users
                      </span>
                      {myExtensions.some(me => me.id === ext.id) ? (
                        <span className="installed-badge">Installed</span>
                      ) : (
                        <button className="install-btn">Explore</button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'my-extensions' && (
            <div className="my-extensions-list">
              {myExtensions.map(ext => (
                <div key={ext.id} className="my-ext-card">
                  <div className="my-ext-icon">{ext.icon}</div>
                  <div className="my-ext-info">
                    <div className="my-ext-header">
                      <h3>{ext.title}</h3>
                      <span className={`status-tag ${ext.status.toLowerCase().replace(' ', '-')}`}>
                        {ext.status}
                      </span>
                    </div>
                    <p>{ext.description}</p>
                    <div className="my-ext-footer">
                      <span className="version-tag">{ext.version}</span>
                      <button className="manage-btn">Manage</button>
                    </div>
                  </div>
                </div>
              ))}
              
              <div className="add-ext-prompt">
                <div className="prompt-content">
                  <Rocket size={32} />
                  <h3>Need more tools?</h3>
                  <p>Discover more powerful extensions in our marketplace.</p>
                  <button className="go-explore-btn" onClick={() => setActiveTab('explore')}>
                    Explore Marketplace
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="settings-container">
              <div className="settings-card">
                <h3>Preferences</h3>
                <div className="setting-item">
                  <div className="setting-info">
                    <h4>Public Profile</h4>
                    <p>Make your profile visible to other users</p>
                  </div>
                  <input type="checkbox" className="toggle" />
                </div>
                <div className="setting-item">
                  <div className="setting-info">
                    <h4>Email Notifications</h4>
                    <p>Receive updates about new features and releases</p>
                  </div>
                  <input type="checkbox" className="toggle" defaultChecked />
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Profile;

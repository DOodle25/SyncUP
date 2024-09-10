import { Button, IconButton, Menu, MenuItem, Drawer, List, ListItem, ListItemText } from "@mui/material";
import { Menu as MenuIcon, ChevronDown, Search, Play } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import Logo from "../assets/Preview.png";

export default function Component() {
  const [expandedVideo, setExpandedVideo] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const open = Boolean(anchorEl);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSidebarOpen = () => {
    setSidebarOpen(true);
  };

  const handleSidebarClose = () => {
    setSidebarOpen(false);
  };
  const videos = [
    { id: 1, company: "OpenAI", title: "How OpenAI connects with customers and expands ChatGPT with Slack" },
    { id: 2, company: "Spotify", title: "How Spotify boosted ad sales and streamlined operations with Slack" },
    { id: 3, company: "IBM", title: "How IBM transformed work culture with Slack" },
    { id: 4, company: "ARI", title: "How ARI improved customer experience with Slack" },
  ];

  return (
    // border-b
    <div className="flex flex-col min-h-screen">
      <header className="flex items-center justify-around px-4 py-4 bg-white ">
        <div className="flex items-center space-x-8">
          <Link to="/" className="flex items-center space-x-2">
            <img src={Logo} alt="Slack logo" className="logo-img" />
          </Link>
          <nav className="hidden lg:flex items-center space-x-4">
            <Link to="#" className="flex items-center text-sm font-medium text-black-600 hover:text-black-900">
              Features
              <ChevronDown className="ml-1 h-4 w-4" />
            </Link>
            <Link to="#" className="flex items-center text-sm font-medium text-black-600 hover:text-black-900">
              Solutions
              <ChevronDown className="ml-1 h-4 w-4" />
            </Link>
            <Link to="#" className="text-sm font-medium text-black-600 hover:text-black-900">
              Enterprise
            </Link>
            <Link to="#" className="flex items-center text-sm font-medium text-black-600 hover:text-black-900">
              Resources
              <ChevronDown className="ml-1 h-4 w-4" />
            </Link>
            <Link to="#" className="text-sm font-medium text-black-600 hover:text-black-900">
              Pricing
            </Link>
          </nav>
        </div>
        <div className="hidden lg:flex items-center space-x-4">
          <IconButton sx={{ color: 'black' }}>
            <Search className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </IconButton>
          <Button variant="text" sx={{ color: 'black', fontWeight: '550', textTransform: 'none' }}>
            Sign in
          </Button>
          <Button variant="outlined" sx={{ color: '#611F69', fontWeight: '550', textTransform: 'none', border: '2px #611F69 solid' }}>
            TALK TO SALES
          </Button>
          <Button variant="contained" sx={{ backgroundColor: '#611F69', fontWeight: '550', textTransform: 'none', border: '2px #611F69 solid' }}>
            GET STARTED
          </Button>
        </div>
        <div className="lg:hidden flex items-center">
          <IconButton onClick={handleSidebarOpen} sx={{ color: 'black' }}>
            <MenuIcon className="h-5 w-5" />
            <span className="sr-only">Menu</span>
          </IconButton>
        </div>
      </header>
      <Drawer
        anchor="right"
        open={sidebarOpen}
        onClose={handleSidebarClose}
        sx={{ '& .MuiDrawer-paper': { width: 250, backgroundColor: 'white', padding: 2 } }}
      >
        <List>
          <ListItem button component={Link} to="#" onClick={handleSidebarClose}>
            <ListItemText primary="Features" />
          </ListItem>
          <ListItem button component={Link} to="#" onClick={handleSidebarClose}>
            <ListItemText primary="Solutions" />
          </ListItem>
          <ListItem button component={Link} to="#" onClick={handleSidebarClose}>
            <ListItemText primary="Enterprise" />
          </ListItem>
          <ListItem button component={Link} to="#" onClick={handleSidebarClose}>
            <ListItemText primary="Resources" />
          </ListItem>
          <ListItem button component={Link} to="#" onClick={handleSidebarClose}>
            <ListItemText primary="Pricing" />
          </ListItem>
          <ListItem button component={Link} to="#" onClick={handleSidebarClose}>
            <ListItemText primary="Sign in" />
          </ListItem>
          <ListItem button component={Link} to="#" onClick={handleSidebarClose}>
            <ListItemText primary="TALK TO SALES" />
          </ListItem>
          <ListItem button component={Link} to="#" onClick={handleSidebarClose}>
            <ListItemText primary="GET STARTED" />
          </ListItem>
        </List>
      </Drawer>

      <main className="flex-grow">
        <section className="max-w-4xl mx-auto py-10 text-center">
          <h1 className="text-6xl font-bold tracking-tight mb-6">
            Made for people.<span className="text-purple-600" style={{ color: '#611F69' }}> Built for productivity.</span>
          </h1>
          <Button variant="contained" sx={{ backgroundColor:"#611F69" }}>
            GET STARTED
          </Button>
          <p className="mt-6 text-xl">
          <span style={{ color:"black", fontWeight:"700" }}>Slack is free to try </span> <span style={{ color:"black", fontWeight:"400" }}>for as long as you like</span>
          </p>
        </section>

        <section className="bg-gray-100 py-20">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-10">
              More than just conversations: how companies work smarter with Slack.
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {videos.map(video => (
                <div
                  key={video.id}
                  className="p-6 bg-white shadow-lg rounded-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-semibold">{video.company}</span>
                    <IconButton onClick={() => setExpandedVideo(video.id)}>
                      <Play className="h-6 w-6" />
                    </IconButton>
                  </div>
                  <p className="text-gray-700">{video.title}</p>
                  {expandedVideo === video.id && (
                    <div className="mt-4">
                      <p className="text-sm">Video is currently playing...</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-black text-white text-center py-4">
        <p>© 2023 Slack Technologies, LLC</p>
      </footer>
    </div>
  );
}

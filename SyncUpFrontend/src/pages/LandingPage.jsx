import {
  Button,
  Container,
  IconButton,
  Menu,
  Card,
  CardMedia,
  CardContent,
  Paper,
  MenuItem,
  Drawer,
  List,
  ListItem,
  Typography,
  Grid,
  Box,
  ListItemText,
} from "@mui/material";
import { Menu as MenuIcon, ChevronDown, Search, Play } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import Logo from "../assets/Preview.png";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();
  const [expandedVideo, setExpandedVideo] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const handleSignInClick = () => {
    navigate("/signin");
  };
  const handleSignUpClick = () => {
    navigate("/signup");
  };
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
    {
      id: 1,
      company: "OpenAI",
      title:
        "How OpenAI connects with customers and expands ChatGPT with Slack",
    },
    {
      id: 2,
      company: "Spotify",
      title:
        "How Spotify boosted ad sales and streamlined operations with Slack",
    },
    {
      id: 3,
      company: "IBM",
      title: "How IBM transformed work culture with Slack",
    },
    {
      id: 4,
      company: "ARI",
      title: "How ARI improved customer experience with Slack",
    },
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
            <Link
              to="#"
              className="flex items-center text-sm font-medium text-black-600 hover:text-black-900"
            >
              Features
              <ChevronDown className="ml-1 h-4 w-4" />
            </Link>
            <Link
              to="#"
              className="flex items-center text-sm font-medium text-black-600 hover:text-black-900"
            >
              Solutions
              <ChevronDown className="ml-1 h-4 w-4" />
            </Link>
            <Link
              to="#"
              className="text-sm font-medium text-black-600 hover:text-black-900"
            >
              Enterprise
            </Link>
            <Link
              to="#"
              className="flex items-center text-sm font-medium text-black-600 hover:text-black-900"
            >
              Resources
              <ChevronDown className="ml-1 h-4 w-4" />
            </Link>
            <Link
              to="#"
              className="text-sm font-medium text-black-600 hover:text-black-900"
            >
              Pricing
            </Link>
          </nav>
        </div>
        <div className="hidden lg:flex items-center space-x-4">
          <IconButton sx={{ color: "black" }}>
            <Search className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </IconButton>
          <Button
            onClick={handleSignInClick}
            variant="text"
            sx={{ color: "black", fontWeight: "550", textTransform: "none" }}
          >
            Sign in
          </Button>
          <Button
            variant="outlined"
            sx={{
              color: "#611F69",
              fontWeight: "550",
              textTransform: "none",
              border: "2px #611F69 solid",
            }}
          >
            TALK TO SALES
          </Button>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#611F69",
              fontWeight: "550",
              textTransform: "none",
              border: "2px #611F69 solid",
            }}
            onClick={handleSignInClick}
          >
            GET STARTED
          </Button>
        </div>
        <div className="lg:hidden flex items-center">
          <IconButton onClick={handleSidebarOpen} sx={{ color: "black" }}>
            <MenuIcon className="h-5 w-5" />
            <span className="sr-only">Menu</span>
          </IconButton>
        </div>
      </header>
      <Drawer
        anchor="right"
        open={sidebarOpen}
        onClose={handleSidebarClose}
        sx={{
          "& .MuiDrawer-paper": {
            width: 250,
            backgroundColor: "white",
            padding: 2,
          },
        }}
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
          <ListItem
            button
            onClick={() => {
              handleSidebarClose();
              navigate("/signin");
            }}
          >
            <ListItemText primary="Sign in" />
          </ListItem>
          <ListItem button component={Link} to="#" onClick={handleSidebarClose}>
            <ListItemText primary="TALK TO SALES" />
          </ListItem>
          <ListItem
            button
            onClick={() => {
              handleSidebarClose();
              navigate("/signin");
            }}
          >
            <ListItemText primary="GET STARTED" />
          </ListItem>
        </List>
      </Drawer>

      <main className="flex-grow">
        <section className="max-w-4xl mx-auto py-10 text-center">
          <h1 className="text-6xl font-bold tracking-tight mb-6">
            Made for people.
            <span className="text-purple-600" style={{ color: "#611F69" }}>
              {" "}
              Built for productivity.
            </span>
          </h1>
          <Button
            variant="contained"
            sx={{ backgroundColor: "#611F69" }}
            onClick={handleSignInClick}
          >
            GET STARTED
          </Button>
          <p className="mt-6 text-xl">
            <span style={{ color: "black", fontWeight: "700" }}>
              Slack is free to try{" "}
            </span>{" "}
            <span style={{ color: "black", fontWeight: "400" }}>
              for as long as you like
            </span>
          </p>
        </section>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background:
              "linear-gradient(to bottom, transparent 50%, #f4ede4 100%)",
          }}
        >
          <video
            width="900"
            height="544"
            autoPlay
            muted
            playsInline
            src="/SyncUPv1.webm"
            style={{ objectFit: "cover" }}
          >
            Your browser does not support the video tag.
          </video>
        </div>
        <div style={{ backgroundColor: "#f4ede4", paddingTop: "40px" }}>
          {/* Zigzag Section 1 */}
          <div className="flex flex-col md:flex-row-reverse items-center mb-10">
            <div className="md:w-1/2 mb-6 md:mb-0 px-20">
              <h2 className="text-5xl font-bold mb-4">
                Move faster with your tools in one place
              </h2>
              <p className="text-lg mb-4">
                Automate away routine tasks with the power of generative AI and
                simplify your workflow with all your favourite apps ready to go
                in Slack.
              </p>
              <Link
                to="https://slack.com/intl/en-in/integrations"
                className="text-blue-900 hover:underline"
              >
                Learn more about the Slack platform
              </Link>
            </div>
            <div className="md:w-1/2">
              <video
                width="900"
                height="544"
                autoPlay
                muted
                playsInline
                src="/SyncUPv2.webm"
                style={{ objectFit: "cover" }}
              >
                Your browser does not support the video tag.
              </video>
            </div>
          </div>

          {/* Zigzag Section 2 */}
          <div className="flex flex-col md:flex-row items-center mb-10">
            <div className="md:w-1/2 mb-6 md:mb-0 px-20">
              <h2 className="text-5xl font-bold mb-4">
                Choose how you want to work
              </h2>
              <p className="text-lg mb-4">
                In Slack, you’ve got all the flexibility to work when, where and
                how it’s best for you. You can easily chat, send audio and video
                clips, or join a huddle to talk things through live.
              </p>
              <Link
                to="https://slack.com/features"
                className="text-blue-900 hover:underline"
              >
                Learn more about flexible communication
              </Link>
            </div>
            <div className="md:w-1/2">
              <video
                width="900"
                height="544"
                autoPlay
                muted
                playsInline
                src="/SyncUPv3.webm"
                style={{ objectFit: "cover" }}
              >
                Your browser does not support the video tag.
              </video>
            </div>
          </div>

          {/* Zigzag Section 3 */}
          <div className="flex flex-col md:flex-row-reverse items-center">
            <div className="md:w-1/2 mb-6 md:mb-0 px-20">
              <h2 className="text-5xl font-bold mb-4">
                Bring your team together
              </h2>
              <p className="text-lg mb-4">
                At the heart of Slack are channels: organised spaces for
                everyone and everything that you need for work. In channels,
                it’s easier to connect across departments, offices, time zones
                and even other companies.
              </p>
              <Link
                to="https://slack.com/features/channels"
                className="text-blue-900 hover:underline"
              >
                Learn more about channels
              </Link>
            </div>
            <div className="md:w-1/2">
              <video
                width="900"
                height="544"
                autoPlay
                muted
                playsInline
                src="/SyncUPv4.webm"
                style={{ objectFit: "cover" }}
              >
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>

        <section className="bg-white py-16 relative px-4">
          <Container>
            <Typography variant="h3" align="center" sx={{ fontWeight: "bold" }}>
              Teams large and small rely on Slack
            </Typography>
            <Typography variant="body1" align="center">
              Slack securely scales up to support collaboration at the world’s
              biggest companies.
            </Typography>
            <div className="text-center mb-12 mt-5 flex flex-col px-20">
              <Button
                variant="contained"
                component={Link}
                to="https://slack.com/intl/en-in/enterprise"
                sx={{
                  marginBottom: "10px",
                  backgroundColor: "#611F69",
                  paddingTop: "14px",
                  paddingBottom: "14px",
                }}
              >
                Meet Slack for Enterprise
              </Button>
              <Button
                variant="outlined"
                sx={{
                  border: "1px solid #611F69",
                  backgroundColor: "white",
                  color: "#611F69",
                  paddingTop: "14px",
                  paddingBottom: "14px",
                }}
                component={Link}
                to="https://slack.com/intl/en-in/contact-sales?geocode=en-in&from_home=1"
              >
                Talk to sales
              </Button>
            </div>
            <Grid container spacing={4} justifyContent="center">
              <Grid item xs={12} sm={4} className="text-center">
                <Typography
                  variant="h5"
                  component="p"
                  sx={{
                    fontWeight: "bold",
                    fontSize: "4rem",
                    color: "#611F69",
                  }}
                >
                  85%
                </Typography>
                <Typography variant="body1">
                  of users say that Slack has improved communication
                  <sup>*</sup>
                </Typography>
              </Grid>
              <Grid item xs={12} sm={4} className="text-center">
                <Typography
                  variant="h5"
                  component="p"
                  sx={{
                    fontWeight: "bold",
                    fontSize: "4rem",
                    color: "#611F69",
                  }}
                >
                  86%
                </Typography>
                <Typography variant="body1">
                  feel that their ability to work remotely has improved
                  <sup>*</sup>
                </Typography>
              </Grid>
              <Grid item xs={12} sm={4} className="text-center">
                <Typography
                  variant="h5"
                  component="p"
                  sx={{
                    fontWeight: "bold",
                    fontSize: "4rem",
                    color: "#611F69",
                  }}
                >
                  88%
                </Typography>
                <Typography variant="body1">
                  feel more connected to their teams
                  <sup>*</sup>
                </Typography>
              </Grid>
            </Grid>
          </Container>
        </section>

        {/* promo section  */}
        <Box
          sx={{
            backgroundColor: "#f4ede4",
            paddingY: "64px",
            paddingX: "66px",
          }}
        >
          <Box sx={{ textAlign: "center", marginBottom: "32px" }}>
            <Typography variant="h2">
              Take a deeper dive into a new way to work
            </Typography>
          </Box>

          <Grid
            container
            spacing={4}
            justifyContent="center"
            sx={{ display: "flex" }}
          >
            <Grid item xs={4} md={3}>
              <Paper elevation={3}>
                <Link
                  href="https://www.salesforce.com/plus/experience/dreamforce_2023/series/productivity_with_slack_at_dreamforce_2023"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    textDecoration: "none",
                    color: "inherit",
                    display: "block",
                  }}
                >
                  <Box>
                    <img
                      src="https://a.slack-edge.com/b37cac3/marketing/img/promos/promo-card-dreamforce-2023.png"
                      alt=""
                      loading="lazy"
                      style={{ width: "100%", height: "auto" }}
                    />
                  </Box>
                  <Box sx={{ padding: "16px" }}>
                    <Typography variant="subtitle2">Event</Typography>
                    <Typography variant="h5">
                      Ready for the future of AI in Slack?
                    </Typography>
                  </Box>
                  <Box sx={{ padding: "16px", textAlign: "center" }}>
                    <Typography>Watch on demand</Typography>
                  </Box>
                </Link>
              </Paper>
            </Grid>

            <Grid item xs={4} md={3}>
              <Paper elevation={3}>
                <Link
                  href="https://slack.com/intl/en-in/blog/news/slack-turns-10"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    textDecoration: "none",
                    color: "inherit",
                    display: "block",
                  }}
                >
                  <Box>
                    <img
                      src="https://a.slack-edge.com/971bef2/marketing/img/promos/slack-turns-10-blog.jpg"
                      alt=""
                      loading="lazy"
                      style={{ width: "100%", height: "auto" }}
                    />
                  </Box>
                  <Box sx={{ padding: "16px" }}>
                    <Typography variant="subtitle2">Blog</Typography>
                    <Typography variant="h6">
                      Ten features to know (and love) on Slack’s tenth birthday
                    </Typography>
                  </Box>
                  <Box sx={{ padding: "16px", textAlign: "center" }}>
                    <Typography>Read more</Typography>
                  </Box>
                </Link>
              </Paper>
            </Grid>

            <Grid item xs={4} md={3}>
              <Paper elevation={3}>
                <Link
                  href="https://slack.com/intl/en-in/customer-stories/openai-connects-with-customers-and-expands-chatgpt-with-slack"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    textDecoration: "none",
                    color: "inherit",
                    display: "block",
                  }}
                >
                  <Box>
                    <img
                      src="https://a.slack-edge.com/426ed86/marketing/img/promos/promo-open-ai.jpg"
                      alt=""
                      loading="lazy"
                      style={{ width: "100%", height: "auto" }}
                    />
                  </Box>
                  <Box sx={{ padding: "16px" }}>
                    <Typography variant="subtitle2">Customer story</Typography>
                    <Typography variant="h5">
                      How OpenAI expands ChatGPT with Slack
                    </Typography>
                  </Box>
                  <Box sx={{ padding: "16px", textAlign: "center" }}>
                    <Typography>Read more</Typography>
                  </Box>
                </Link>
              </Paper>
            </Grid>

            <Grid item xs={4} md={3}>
              <Paper elevation={3}>
                <Link
                  href="https://slack.com/intl/en-in/events/tips-and-tricks-to-boost-productivity"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    textDecoration: "none",
                    color: "inherit",
                    display: "block",
                  }}
                >
                  <Box>
                    <img
                      src="https://a.slack-edge.com/426ed86/marketing/img/promos/promo-boost-productivity.jpg"
                      alt=""
                      loading="lazy"
                      style={{ width: "100%", height: "auto" }}
                    />
                  </Box>
                  <Box sx={{ padding: "16px" }}>
                    <Typography variant="subtitle2">Webinar</Typography>
                    <Typography variant="h5">
                      Top Slack tips to boost productivity
                    </Typography>
                  </Box>
                  <Box sx={{ padding: "16px", textAlign: "center" }}>
                    <Typography>Watch now</Typography>
                  </Box>
                </Link>
              </Paper>
            </Grid>
          </Grid>
        </Box>
        <Box
          sx={{
            backgroundColor: "#4a154b",
            clipPath: "ellipse(75% 100% at center top)",
            paddingTop: "5rem",
            paddingBottom: "5rem",
            minHeight: "370px",
            textAlign: "center",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "visible",
          }}
        >
          <Container>
            <Typography
              variant="h3"
              component="h3"
              color="white"
              gutterBottom
              sx={{ marginBottom: "2rem" }}
            >
              See all that you can accomplish with Slack
            </Typography>
            <Button
              variant="outlined"
              color="secondary"
              sx={{ margin: "0 1rem" }}
              onClick={handleSignInClick}
            >
              Get started
            </Button>
            <Button
              variant="contained"
              color="secondary"
              href="https://slack.com/intl/en-in/contact-sales?geocode=en-in&from_home=1"
              sx={{ margin: "0 1rem" }}
              data-clog-ui-element="link_contact_sales"
              data-clog-ui-component="inc_cta_footer"
              data-qa="footer_cta_contact_sales"
            >
              Talk to sales
            </Button>
          </Container>
        </Box>
      </main>
      <footer className="bg-white py-6">
      <Container maxWidth="lg">
          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12} sm={3}>
              <Typography variant="h6" gutterBottom>
                Product
              </Typography>
              <List>
                <ListItem button component={Link} to="#">
                  <ListItemText primary="Features" />
                </ListItem>
                <ListItem button component={Link} to="#">
                  <ListItemText primary="Pricing" />
                </ListItem>
                <ListItem button component={Link} to="#">
                  <ListItemText primary="Enterprise" />
                </ListItem>
              </List>
            </Grid>
            <Grid item xs={12} sm={3}>
              <Typography variant="h6" gutterBottom>
                Company
              </Typography>
              <List>
                <ListItem button component={Link} to="#">
                  <ListItemText primary="About Us" />
                </ListItem>
                <ListItem button component={Link} to="#">
                  <ListItemText primary="Careers" />
                </ListItem>
                <ListItem button component={Link} to="#">
                  <ListItemText primary="Contact" />
                </ListItem>
              </List>
            </Grid>
            <Grid item xs={12} sm={3}>
              <Typography variant="h6" gutterBottom>
                Resources
              </Typography>
              <List>
                <ListItem button component={Link} to="#">
                  <ListItemText primary="Blog" />
                </ListItem>
                <ListItem button component={Link} to="#">
                  <ListItemText primary="Help Center" />
                </ListItem>
                <ListItem button component={Link} to="#">
                  <ListItemText primary="Privacy Policy" />
                </ListItem>
              </List>
            </Grid>
            <Grid item xs={12} sm={3}>
              <Typography variant="h6" gutterBottom>
                Follow Us
              </Typography>
              <List>
                <ListItem button component={Link} to="#">
                  <ListItemText primary="Twitter" />
                </ListItem>
                <ListItem button component={Link} to="#">
                  <ListItemText primary="LinkedIn" />
                </ListItem>
                <ListItem button component={Link} to="#">
                  <ListItemText primary="Facebook" />
                </ListItem>
              </List>
            </Grid>
          </Grid>
          <Box mt={4} textAlign="center">
            <Typography variant="body2" color="textSecondary">
              &copy; {new Date().getFullYear()} Your Company. All rights reserved.
            </Typography>
          </Box>
        </Container>
      </footer>
    </div>
  );
}

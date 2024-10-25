import React, { useEffect, useRef } from 'react';
import { Box, Stack, Typography, Divider } from '@mui/material';

const MessageDisplay = ({ messages, selectedChannel, channels, name }) => {
  const messageEndRef = useRef(null);

  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const channelName =
    channels.find((ch) => ch._id === selectedChannel)?.name || 'Channel Messages';

  let prevDate = '';
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const formatDateDivider = (message) => {
    const date = new Date(message.createdAt);
    let today = `${days[date.getDay()]}, ${date.getDate()} ${months[date.getMonth()]}`;

    if (prevDate === today) return null;
    prevDate = today;

    return (
      <Divider sx={{ margin: '20px 0', fontSize: '12px' }}>
        <Typography
          sx={{
            border: '1px rgba(0,0,0,0.2) solid',
            borderRadius: '20px',
            padding: '5px 12px',
            fontWeight: 600,
            fontSize: '12px',
            color: 'rgba(0,0,0,0.8)',
          }}
        >
          {today}
        </Typography>
      </Divider>
    );
  };

  return (
    <Stack sx={{ width: '100%', paddingBottom: '20px', backgroundColor: 'white', height: 'calc(100vh - 100px)', overflowY: 'auto' }}>
      <Stack direction="column" gap={2} padding="60px 25px 0 25px">
        {/* Header Section */}
        {selectedChannel ? (
          <>
            <Stack direction="column" gap={1}>
              <Typography fontSize="24px" fontWeight={800}>
                Welcome to #{channelName}
              </Typography>
              <Typography sx={{ fontSize: '14px', fontWeight: 400, color: 'rgba(0,0,0,0.6)' }}>
                This channel is for all discussions and collaborations.
              </Typography>
            </Stack>

            {/* Message Section */}
            {messages
              ?.filter((msg) => msg.channelId === selectedChannel)
              .map((msg, index) => (
                <Stack key={msg._id} direction="column" width="100%">
                  {formatDateDivider(msg)}
                  <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
                    <Box
                      sx={{
                        width: '35px',
                        height: '35px',
                        
                        backgroundColor: '#7B1FA2',
                        color: '#fff',
                        borderRadius: '20%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {name ? name.charAt(0).toUpperCase() : "U"}
                    </Box>
                    <Stack>
                      <Stack direction="row" alignItems="center">
                        <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                          {msg.sender}
                        </Typography>
                        <Typography variant="body2" sx={{ ml: 1, fontSize: '12px', color: 'rgba(0, 0, 0, 0.6)' }}>
                          {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </Typography>
                      </Stack>
                      <Typography variant="body1" sx={{ color: 'rgba(0, 0, 0, 0.8)' }}>
                        {msg.message}
                      </Typography>
                    </Stack>
                  </Stack>
                </Stack>
              ))}
            <div ref={messageEndRef} />
          </>
        ) : (
          <Typography variant="body1" sx={{ textAlign: 'center' }}>
            Select a channel to view messages
          </Typography>
        )}
      </Stack>
    </Stack>
  );
};

export default MessageDisplay;

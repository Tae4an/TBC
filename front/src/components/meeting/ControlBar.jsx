import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, IconButton, Badge, Tooltip, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import {
    Mic as MicIcon,
    MicOff as MicOffIcon,
    Videocam as VideocamIcon,
    VideocamOff as VideocamOffIcon,
    CallEnd as CallEndIcon,
    Message as MessageIcon,
    ScreenShare as ScreenShareIcon,
    StopScreenShare as StopScreenShareIcon
} from '@mui/icons-material';
import '../../styles/meeting.css';

const ControlBar = ({
                        isMuted,
                        isVideoOff,
                        isScreenSharing,
                        onToggleMute,
                        onToggleVideo,
                        onToggleScreenShare,
                        onEndCall,
                        onChatToggle,
                        unreadMessages
                    }) => {
    const [isEndCallDialogOpen, setIsEndCallDialogOpen] = useState(false);

    const handleEndCallClick = () => {
        setIsEndCallDialogOpen(true);
    };

    const handleConfirmEndCall = () => {
        setIsEndCallDialogOpen(false);
        onEndCall();
    };

    const handleCancelEndCall = () => {
        setIsEndCallDialogOpen(false);
    };

    return (
        <>
            <Box
                className="control-bar"
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: 2,
                    mt: 3,
                    pb: 2,
                    flexWrap: 'wrap'
                }}
            >
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <Tooltip title={isMuted ? "마이크 켜기" : "마이크 끄기"}>
                        <IconButton
                            onClick={onToggleMute}
                            className={`${isMuted ? 'error-btn' : 'primary-btn'} ${isMuted ? 'error-state' : ''}`}
                        >
                            {isMuted ? <MicOffIcon /> : <MicIcon />}
                        </IconButton>
                    </Tooltip>

                    <Tooltip title={isVideoOff ? "비디오 켜기" : "비디오 끄기"}>
                        <IconButton
                            onClick={onToggleVideo}
                            className={`${isVideoOff ? 'error-btn' : 'primary-btn'} ${isVideoOff ? 'error-state' : ''}`}
                        >
                            {isVideoOff ? <VideocamOffIcon /> : <VideocamIcon />}
                        </IconButton>
                    </Tooltip>

                    <Tooltip title="회의 나가기">
                        <IconButton
                            onClick={handleEndCallClick}
                            className="end-call-btn"
                            sx={{
                                mx: { xs: 1, sm: 3 }
                            }}
                        >
                            <CallEndIcon />
                        </IconButton>
                    </Tooltip>

                    <Tooltip title={isScreenSharing ? "화면 공유 중지" : "화면 공유 시작"}>
                        <IconButton
                            onClick={onToggleScreenShare}
                            className={`${isScreenSharing ? 'active-btn' : 'primary-btn'}`}
                        >
                            {isScreenSharing ? <StopScreenShareIcon /> : <ScreenShareIcon />}
                        </IconButton>
                    </Tooltip>
                </Box>



                <Box sx={{ display: 'flex', gap: 2 }}>
                    <Tooltip title="채팅">
                        <IconButton
                            onClick={onChatToggle}
                            className="primary-btn"
                        >
                            <Badge
                                badgeContent={unreadMessages}
                                color="error"
                                invisible={unreadMessages === 0}
                                sx={{
                                    '& .MuiBadge-badge': {
                                        background: 'var(--danger)',
                                    }
                                }}
                            >
                                <MessageIcon />
                            </Badge>
                        </IconButton>
                    </Tooltip>
                </Box>
            </Box>

            <Dialog
                open={isEndCallDialogOpen}
                onClose={handleCancelEndCall}
                aria-labelledby="end-call-dialog-title"
            >
                <DialogTitle id="end-call-dialog-title">
                    회의 나가기
                </DialogTitle>
                <DialogContent>
                    정말로 회의를 나가시겠습니까?
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancelEndCall} color="primary">
                        취소
                    </Button>
                    <Button onClick={handleConfirmEndCall} color="error" variant="contained">
                        나가기
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

ControlBar.propTypes = {
    isMuted: PropTypes.bool.isRequired,
    isVideoOff: PropTypes.bool.isRequired,
    isScreenSharing: PropTypes.bool.isRequired,
    onToggleMute: PropTypes.func.isRequired,
    onToggleVideo: PropTypes.func.isRequired,
    onToggleScreenShare: PropTypes.func.isRequired,
    onEndCall: PropTypes.func.isRequired,
    onChatToggle: PropTypes.func.isRequired,
    unreadMessages: PropTypes.number
};

ControlBar.defaultProps = {
    unreadMessages: 0
};

export default ControlBar;
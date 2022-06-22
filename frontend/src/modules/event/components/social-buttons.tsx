import EmailIcon from '@mui/icons-material/Email'
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import TelegramIcon from '@mui/icons-material/Telegram'
import TwitterIcon from '@mui/icons-material/Twitter'
import WhatsAppIcon from '@mui/icons-material/WhatsApp'
import {
  EmailShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from 'react-share'

const SocialButtons = () => {
  return (
    <div className="social-buttons">
      <EmailShareButton
        url={window.location.href}
        className="btn btn-icon-only"
      >
        <EmailIcon />
      </EmailShareButton>

      <FacebookShareButton
        url={window.location.href}
        className="btn btn-icon-only"
      >
        <FacebookOutlinedIcon />
      </FacebookShareButton>

      <LinkedinShareButton
        url={window.location.href}
        className="btn btn-icon-only"
      >
        <LinkedInIcon />
      </LinkedinShareButton>

      <TelegramShareButton
        url={window.location.href}
        className="btn btn-icon-only"
      >
        <TelegramIcon />
      </TelegramShareButton>

      <TwitterShareButton
        url={window.location.href}
        className="btn btn-icon-only"
      >
        <TwitterIcon />
      </TwitterShareButton>

      <WhatsappShareButton
        url={window.location.href}
        className="btn btn-icon-only"
      >
        <WhatsAppIcon />
      </WhatsappShareButton>
    </div>
  )
}

export default SocialButtons

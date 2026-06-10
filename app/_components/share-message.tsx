import {Modal} from "antd";
import {WhatsappShareButton, WhatsappIcon,
    LinkedinShareButton, LinkedinIcon,
    FacebookShareButton, FacebookIcon,
    XShareButton, XIcon,
} from "react-share";

function ShareMessage({ open, setOpen, messageToShare }
    : {open: boolean, setOpen: (open: boolean) => void, messageToShare: string}
) {
    return (
        <Modal open={open} 
            onCancel={() => setOpen(false)}
            title="Share Message"
            centered
            footer={null}>
            <div className="flex flex-col gap-4">
                <p>Share this message:</p>
                <div className="flex gap-4">
                    <WhatsappShareButton url={messageToShare} >
                        <WhatsappIcon />
                    </WhatsappShareButton>
                    <LinkedinShareButton url={messageToShare} >
                        <LinkedinIcon />
                    </LinkedinShareButton>
                    <FacebookShareButton url={messageToShare} >
                        <FacebookIcon />
                    </FacebookShareButton>
                    <XShareButton url={messageToShare} >
                        <XIcon />
                    </XShareButton>
                </div>
            </div>
         </Modal> 
    )      
}

export default ShareMessage;
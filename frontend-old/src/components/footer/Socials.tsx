import { Box, useColorMode } from '@chakra-ui/react'
import { config } from '../../utils/config'
import { SocialIcon } from 'react-social-icons'

export const Socials = () => {
    const { colorMode } = useColorMode()
    const isDark = colorMode === 'dark'

    return (
        <>
        <Box mr='10px' pb='10px'>
            <SocialIcon
                aria-label="Github"
                url={"https://github.com/" + config.socials.github}
                bgColor={isDark ? "lightgreen" : "black"}
                style={{ height: 25, width: 25 }}
            />
        </Box>
        <Box mr='10px' pb='10px'>
            <SocialIcon
                aria-label="Reddit"
                url={"https://reddit.com/r/" + config.socials.reddit}
                bgColor={isDark ? "lightgreen" : "black"}
                style={{ height: 25, width: 25 }}
            />
        </Box>
        {/* last one doesnt get padding!!  */ }
        <Box pb='10px'>
            <SocialIcon
                aria-label="Twitter"
                url={"https://twitter.com/" + config.socials.twitter}
                bgColor={isDark ? "lightgreen" : "black"}
                style={{ height: 25, width: 25 }}
            />
        </Box>
        </>
        
    )
}

export default Socials;

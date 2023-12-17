import { ArrowLeftIcon } from "@heroicons/react/24/solid"
import { useNavigate } from "react-router-dom"
import { Button, Text, Heading } from '@adobe/react-spectrum'

function NoAccess() {
const navigate = useNavigate()

  const handleBackNavigation = () => {
    navigate(-1)
  }

  return (
    <div>
        <Heading level={1}>Oops, it looks that you are lost</Heading>

        <Button 
        variant="primary"
        style="outline"
        onPress={handleBackNavigation}>
            <ArrowLeftIcon />
            <Text>Back</Text>  
        </Button>
    </div>
  )
}

export default NoAccess
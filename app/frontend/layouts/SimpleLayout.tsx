import { ReactNode } from 'react';
import { Flex, Box, Spacer, useColorModeValue } from '@chakra-ui/react';
import SmallFooterWithSocial from '../components/Footer';
import NavHeader from '@/pages/Nav/NavHeader';
import { FaUsers } from 'react-icons/fa';

const SimpleLayout = ({ children }: { children: ReactNode }) => {
  const bg = useColorModeValue('gray.50', 'gray.600');
  const routes = [
    {
      path: "/dashboard",
      name: "Dashboard",
      icon: FaUsers, // Replace with the appropriate icon component
    },
    {
      path: "/profile",
      name: "Profile",
      icon: FaUsers,
    },
    // Add more routes as needed
  ];

  return (
    <Flex direction="column" height="100vh" minWidth="360px" bg={bg}>
      <Box paddingLeft={{ xl: "300px" }} padding={[2, 6]} width="100%"> {/* Adjust content padding to account for sidebar width */}
        <NavHeader />
        {children}
        <Spacer />
        <Box>
          <SmallFooterWithSocial />
        </Box>
      </Box>
    </Flex>
  );
};

export default SimpleLayout;

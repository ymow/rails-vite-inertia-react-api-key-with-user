import { ReactNode } from 'react';
import { router } from '@inertiajs/react';
import {
  Button,
  Checkbox,
  Container,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Heading,
  Icon,
  Input,
  Stack,
  useColorMode,
} from '@chakra-ui/react';
import { FaUserPlus } from 'react-icons/fa';
import { IoArrowBackCircle } from 'react-icons/io5';
import { HiOutlineSave } from 'react-icons/hi';
import { MdCancel } from 'react-icons/md';

import SimpleLayout from '@/layouts/SimpleLayout';
import FormWrapper from '@/components/FormWrapper';

type UserType = {
  id: number;
  username: string;
  email: string;
};

type UsersNewProps = {
  user: UserType;
};

const UsersList = ({ user }: UsersNewProps) => {
  const { colorMode } = useColorMode();

  const goBack = () => {
    router.visit('/admin/users/');
  };

  return (
    <Container padding={0} maxW="container.sm" id="page_container">
      <Flex justifyContent="space-between">
        <HStack paddingLeft={4}>
          <Icon as={FaUserPlus} boxSize={5} />
          <Heading size="md" flexDirection="column">
            New User
          </Heading>
        </HStack>
        <Button variant="outline" size="sm" onClick={goBack} borderRadius="20px" colorScheme="teal" marginRight={2}>
          <Icon as={IoArrowBackCircle} boxSize={5} />
          &nbsp;Back To List
        </Button>
      </Flex>

      <FormWrapper className={colorMode === 'light' ? 'form-wrapper-light' : 'form-wrapper-dark'}>
        <Stack spacing="6" direction="column">
          <FormControl id="username">
            <FormLabel>Username</FormLabel>
            <Input defaultValue={user.username} variant="filled" />
          </FormControl>
          <FormControl id="email">
            <FormLabel>Email</FormLabel>
            <Input defaultValue={user.email} variant="filled" />
          </FormControl>
          <FormControl id="isAdmin">
            <HStack>
              <Checkbox defaultChecked={false} />
              <FormLabel paddingTop="2">Is Admin?</FormLabel>
            </HStack>
          </FormControl>
        </Stack>
      </FormWrapper>
      <Divider />
      <Stack direction="row-reverse" py={1} px={2} spacing={2}>
        <Button type="submit" variant="solid" colorScheme="blue" leftIcon={<HiOutlineSave />} width="120px">
          Save
        </Button>
        <Button type="submit" variant="solid" colorScheme="teal" leftIcon={<MdCancel />} width="120px">
          Cancel
        </Button>
      </Stack>
    </Container>
  );
};

UsersList.layout = (page: ReactNode) => <SimpleLayout>{page}</SimpleLayout>;

export default UsersList;

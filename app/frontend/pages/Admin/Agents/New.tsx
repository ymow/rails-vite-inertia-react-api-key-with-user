import { ReactNode, FormEvent } from 'react';
import { useForm, router } from '@inertiajs/react';
import { Button, Container, FormControl, FormLabel, Input, Stack, useToast } from '@chakra-ui/react';
import SimpleLayout from '@/layouts/SimpleLayout';
import useTypedPage from '@/hooks/useTypedPage';

type AgentNewProps = {
  agent: { api_key: string };
};

const AgentNew = ({ agent }: AgentNewProps) => {
  const { flash, errors } = useTypedPage().props;
  const toast = useToast();
  const { data, setData, post } = useForm({ api_key: agent.api_key });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    post('/admin/agents', {
      onSuccess: () => {
        toast({
          title: 'Success',
          description: 'API key created successfully.',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
      },
    });
  };

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <Stack spacing={4}>
          <FormControl id="api_key">
            <FormLabel>API Key</FormLabel>
            <Input value={data.api_key} onChange={(e) => setData('api_key', e.target.value)} />
          </FormControl>
          <Button type="submit" colorScheme="blue">
            Save
          </Button>
        </Stack>
      </form>
    </Container>
  );
};

AgentNew.layout = (page: ReactNode) => <SimpleLayout>{page}</SimpleLayout>;

export default AgentNew;

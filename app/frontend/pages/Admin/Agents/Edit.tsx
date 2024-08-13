import { ReactNode, FormEvent } from 'react';
import { useForm, router } from '@inertiajs/react';
import { Button, Container, FormControl, FormLabel, Input, Stack, useToast } from '@chakra-ui/react';
import SimpleLayout from '@/layouts/SimpleLayout';
import useTypedPage from '@/hooks/useTypedPage';

type AgentEditProps = {
  agent: { api_key: string };
};

const AgentEdit = ({ agent }: AgentEditProps) => {
  const { flash, errors } = useTypedPage().props;
  const toast = useToast();
  const { data, setData, put } = useForm({ api_key: agent.api_key });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    put(`/admin/agents/${agent.id}`, {
      onSuccess: () => {
        toast({
          title: 'Success',
          description: 'API key updated successfully.',
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

AgentEdit.layout = (page: ReactNode) => <SimpleLayout>{page}</SimpleLayout>;

export default AgentEdit;

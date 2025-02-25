<script setup lang="ts">
import { toast } from '~/components/ui/toast';

useHead({
    title: 'Profile',
});

const client = useSupabaseClient();
const user = useSupabaseUser();

const isLoading = ref<boolean>(false);

async function signout() {
    isLoading.value = true;

    try {
        await client.auth.signOut();

        toast({
            title: 'Sign Out Success',
            description: 'You have successfully signed out of your account.',
            duration: 5000,
        });

        navigateTo('/login');
    }
    catch (error: any) {
        toast({
            title: 'Sign Out Failed',
            description: error.message,
            variant: 'destructive',
            duration: 5000,
        });
    }
    finally {
        isLoading.value = false;
    }
}
</script>

<template>
    <div class="flex flex-col items-center justify-center h-screen">
        <Card class="w-96">
            <CardHeader>
                <CardTitle>Profile</CardTitle>
            </CardHeader>
            <CardContent>
                <Skeleton v-if="isLoading" class="h-5 w-full" />
                <div v-else>
                    Email: {{ user?.email }}
                </div>
            </CardContent>
            <CardFooter>
                <Button :disabled="isLoading" @click="signout()">
                    Sign Out
                </Button>
            </CardFooter>
        </Card>
    </div>
</template>

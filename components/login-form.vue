<script setup lang="ts">
import { useToast } from '@/components/ui/toast/use-toast';
import { cn } from '@/lib/utils';
import { GithubLogoIcon } from '@radix-icons/vue';
import { toTypedSchema } from '@vee-validate/zod';
import { useForm } from 'vee-validate';
import * as z from 'zod';

const isLoading = ref<boolean>(false);
const isPasswordVisible = ref<boolean>(false);

const { toast } = useToast();
const client = useSupabaseClient();

const accountFormSchema = toTypedSchema(z.object({
    email: z.string().min(1, 'Enter a valid email address').email('Enter a valid email address'),
    password: z.string().min(1, 'Enter a valid password'),
}));

const { handleSubmit, resetForm } = useForm({
    validationSchema: accountFormSchema,
});

const signin = handleSubmit(async (values) => {
    isLoading.value = true;
    try {
        const { error } = await client.auth.signInWithPassword({
            email: values.email,
            password: values.password,
        });

        if (error)
            throw error;

        toast({
            title: 'Sign In Success',
            description: 'You have successfully signed in to your account.',
            duration: 5000,
        });

        navigateTo('/profile');
    }
    catch (error: any) {
        toast({
            title: 'Sign In Failed',
            description: error.message,
            variant: 'destructive',
            duration: 5000,
        });
    }
    finally {
        resetForm();
        isLoading.value = false;
    };
});

async function githubSignup() {
    isLoading.value = true;

    try {
        const { data } = await client.auth.signInWithOAuth({
            provider: 'github',
            options: {
                redirectTo: `${import.meta.env.VITE_APP_URL}/auth/v1/callback`,
            },
        });

        if (data.url) {
            window.location.href = data.url;
        }

        navigateTo('/profile');
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Failed to sign up with GitHub';

        toast({
            title: 'Sign Up Failed',
            description: errorMessage,
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
    <div :class="cn('grid gap-6', $attrs.class ?? '')">
        <form class="space-y-2" :validate-schema="accountFormSchema" @submit.prevent="signin">
            <FormField v-slot="{ componentField }" name="email">
                <FormItem>
                    <FormControl>
                        <Input
                            id="email"
                            placeholder="Enter your email..."
                            type="email"
                            v-bind="componentField"
                            auto-capitalize="none"
                            auto-complete="email"
                            auto-correct="off"
                            :disabled="isLoading"
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            </FormField>

            <FormField v-slot="{ componentField }" name="password">
                <FormItem>
                    <FormControl>
                        <div class="relative">
                            <Input
                                id="password"
                                placeholder="Enter your password..."
                                :type="isPasswordVisible ? 'text' : 'password'"
                                v-bind="componentField"
                                auto-capitalize="none"
                                auto-complete="off"
                                auto-correct="off"
                                :disabled="isLoading"
                            />

                            <button type="button" class="absolute right-3 top-1/2 -translate-y-1/2" @click="isPasswordVisible = !isPasswordVisible">
                                <IconEyeOff v-if="isPasswordVisible" class="h-5 w-5" />
                                <IconEye v-else class="h-5 w-5" />
                            </button>
                        </div>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            </FormField>

            <Button :disabled="isLoading" class="w-full" type="submit">
                <IconLoader2 v-if="isLoading" class="h-4 w-4 animate-spin" />
                Continue with Email
            </Button>
        </form>
        <div class="relative">
            <div class="absolute inset-0 flex items-center">
                <span class="w-full border-t" />
            </div>
            <div class="relative flex justify-center text-xs uppercase">
                <span class="bg-background px-2 text-muted-foreground">
                    Or continue with
                </span>
            </div>
        </div>
        <Button variant="outline" type="button" :disabled="isLoading" @click="githubSignup()">
            <IconLoader2 v-if="isLoading" class="h-4 w-4 animate-spin" />
            <GithubLogoIcon v-else class="h-4 w-4" />
            Continue with Github
        </Button>
    </div>
</template>

import HeadingSmall from '@/components/heading-small';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import type { User as UserType } from '@/types';
import { type BreadcrumbItem } from '@/types';
import type { PageProps } from '@inertiajs/core';
import { Head, useForm, usePage } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Users',
        href: 'settings/users',
    },
];

interface Props extends PageProps {
    users: UserType[];
    auth: {
        user: UserType | null;
    };
    [key: string]: any;
}

type RegisterForm = {
    name: string;
    email: string;
    phone_number: string;
    user_role: string;
    password: string;
    password_confirmation: string;
};

export default function Users() {
    // *FETCHING USERS FROM BACKEND
    const { users } = usePage<Props>().props;

    const { data, setData, post, processing, errors, reset } = useForm<Required<RegisterForm>>({
        name: '',
        email: '',
        phone_number: '',
        user_role: '',
        password: '',
        password_confirmation: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Password settings" />

            <SettingsLayout>
                <div className="grid grid-cols-2 gap-5">
                    <div className="max-w-sm space-y-6">
                        <HeadingSmall title="Create User" description="Create New Users for your organization" />

                        <form className="flex flex-col gap-6" onSubmit={submit}>
                            <div className="grid gap-6">
                                <div className="grid gap-2">
                                    <Label htmlFor="name">Name</Label>
                                    <Input
                                        id="name"
                                        type="text"
                                        required
                                        autoFocus
                                        tabIndex={1}
                                        autoComplete="name"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        disabled={processing}
                                        placeholder="Full name"
                                    />
                                    <InputError message={errors.name} className="mt-2" />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="email">Email address</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        required
                                        tabIndex={2}
                                        autoComplete="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        disabled={processing}
                                        placeholder="email@example.com"
                                    />
                                    <InputError message={errors.email} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="phone_num">Phone Number</Label>
                                    <Input
                                        id="phone_num"
                                        type="text"
                                        required
                                        tabIndex={2}
                                        autoComplete="name"
                                        value={data.phone_number}
                                        onChange={(e) => setData('phone_number', e.target.value)}
                                        disabled={processing}
                                        placeholder="Enter Mobile Number"
                                    />
                                    <InputError message={errors.email} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="user_role">User Role</Label>
                                    <Select value={data.user_role} onValueChange={(value) => setData('user_role', value)}>
                                        <SelectTrigger className="w-[180px]">
                                            <SelectValue placeholder="Select User Role" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>Roles</SelectLabel>
                                                <SelectItem value="ORGANIZATION_MANAGER">Manager</SelectItem>
                                                <SelectItem value="ORGANIZATION_TEAM_LEADER">Team Leader</SelectItem>
                                                <SelectItem value="ORGANIZATION_STAFF">Team Member</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                    <InputError message={errors.email} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="password">Password</Label>
                                    <Input
                                        id="password"
                                        type="password"
                                        required
                                        tabIndex={3}
                                        autoComplete="new-password"
                                        value={data.password}
                                        onChange={(e) => setData('password', e.target.value)}
                                        disabled={processing}
                                        placeholder="Password"
                                    />
                                    <InputError message={errors.password} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="password_confirmation">Confirm password</Label>
                                    <Input
                                        id="password_confirmation"
                                        type="password"
                                        required
                                        tabIndex={4}
                                        autoComplete="new-password"
                                        value={data.password_confirmation}
                                        onChange={(e) => setData('password_confirmation', e.target.value)}
                                        disabled={processing}
                                        placeholder="Confirm password"
                                    />
                                    <InputError message={errors.password_confirmation} />
                                </div>

                                <Button type="submit" className="mt-2 w-full" tabIndex={5} disabled={processing}>
                                    {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                                    Create User
                                </Button>
                            </div>
                        </form>
                    </div>
                    <div className="space-y-6">
                        <HeadingSmall title="All Users" description="Users Of your organization will be listed here" />

                        <ScrollArea className="h-[400px] w-full rounded-md border p-4">
                            <Table>
                                <TableCaption>A list of your recent invoices.</TableCaption>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[150px]">Name</TableHead>
                                        <TableHead className="w-[100px]">Role</TableHead>
                                        <TableHead>Status</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {users.map((user) => (
                                        <TableRow key={user.id}>
                                            <TableCell className="font-medium">{user.name}</TableCell>
                                            <TableCell>{user.user_role}</TableCell>
                                            <TableCell>{user.created_at}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </ScrollArea>
                    </div>
                </div>
            </SettingsLayout>
        </AppLayout>
    );
}

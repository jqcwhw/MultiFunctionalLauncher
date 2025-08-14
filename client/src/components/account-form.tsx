import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { apiRequest } from "@/lib/queryClient";
import { queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { insertAccountSchema } from "@shared/schema";
import type { Account } from "@shared/schema";
import { z } from "zod";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface AccountFormProps {
  account?: Account;
  onSuccess: () => void;
  onCancel: () => void;
}

const accountFormSchema = insertAccountSchema.extend({
  roblosecurityToken: z.string().optional(),
});

export function AccountForm({ account, onSuccess, onCancel }: AccountFormProps) {
  const { toast } = useToast();
  const isEditing = !!account;

  // Assuming 'accounts' is fetched elsewhere and available in this scope, or passed as a prop.
  // For demonstration, let's assume it's fetched here. In a real app, you'd likely use a query.
  const accounts: Account[] = []; // Replace with actual data fetching if needed

  const form = useForm<z.infer<typeof accountFormSchema>>({
    resolver: zodResolver(accountFormSchema),
    defaultValues: {
      username: account?.username || "",
      displayName: account?.displayName || "",
      roblosecurityToken: account?.roblosecurityToken || "",
      isActive: account?.isActive ?? true,
    },
  });

  const createAccountMutation = useMutation({
    mutationFn: async (data: z.infer<typeof accountFormSchema>) => {
      const response = await apiRequest("POST", "/api/accounts", data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/accounts"] });
      onSuccess();
      toast({
        title: "Success",
        description: "Account created successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to create account",
        variant: "destructive",
      });
    },
  });

  const updateAccountMutation = useMutation({
    mutationFn: async (data: z.infer<typeof accountFormSchema>) => {
      const response = await apiRequest("PUT", `/api/accounts/${account!.id}`, data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/accounts"] });
      onSuccess();
      toast({
        title: "Success",
        description: "Account updated successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update account",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: z.infer<typeof accountFormSchema>) => {
    if (isEditing) {
      updateAccountMutation.mutate(data);
    } else {
      createAccountMutation.mutate(data);
    }
  };

  const isPending = createAccountMutation.isPending || updateAccountMutation.isPending;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Enter Roblox username" {...field} />
              </FormControl>
              <FormDescription>
                Your Roblox username (without @)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="displayName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Display Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter display name" {...field} />
              </FormControl>
              <FormDescription>
                How this account will be displayed in the app
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="roblosecurityToken"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ROBLOSECURITY Token (Optional)</FormLabel>
              <FormControl>
                <Input 
                  type="password" 
                  placeholder="Enter ROBLOSECURITY token for automatic login" 
                  {...field} 
                />
              </FormControl>
              <FormDescription>
                Used for automatic login. Leave empty for manual login.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="isActive"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Active Account</FormLabel>
                <FormDescription>
                  Whether this account is available for use
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />

        {/* This is where the account selection dropdown would typically go if this form was for selecting an account */}
        {/* As this form is for creating/editing an account, the dropdown for selecting an account is not directly part of this form's fields. */}
        {/* If the intention was to select an account *within* this form for some reason, it would need to be added as a FormField. */}
        {/* For example, if 'account' prop was intended to be selected from a list: */}
        {/*
        {!isEditing && (
          <FormField
            control={form.control}
            name="selectedAccountId" // Assuming a field like this exists or is added to the schema
            render={({ field }) => (
              <FormItem>
                <FormLabel>Select Account</FormLabel>
                <Select onValueChange={(value) => field.onChange(parseInt(value))}>
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select an account" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="max-h-60 overflow-y-auto">
                    {accounts.map((account) => (
                      <SelectItem 
                        key={account.id} 
                        value={account.id.toString()}
                        className="cursor-pointer hover:bg-gray-100 px-3 py-2"
                      >
                        <div className="flex flex-col">
                          <span className="font-medium">{account.displayName}</span>
                          <span className="text-sm text-gray-500">@{account.username}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        */}


        <div className="flex justify-end space-x-2 pt-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" disabled={isPending}>
            {isPending ? "Saving..." : isEditing ? "Update Account" : "Create Account"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
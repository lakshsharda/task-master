import { useState } from "react"; // Hook to manage state in functional components
import { useNavigate } from "react-router-dom"; // Hook to navigate programmatically between routes
import { useAuth } from "@/contexts/AuthContext"; // Custom authentication context
import { Button } from "@/components/ui/button"; // Reusable Button component
import { Input } from "@/components/ui/input"; // Reusable Input component
import { Card } from "@/components/ui/card"; // Reusable Card component
import { useToast } from "@/components/ui/use-toast"; // Hook to display toast notifications

export default function Login() {
  const [email, setEmail] = useState(""); // State for storing the user's email
  const [password, setPassword] = useState(""); // State for storing the user's password
  const navigate = useNavigate(); // Hook to navigate to other routes
  const { login } = useAuth(); // Accessing the login function from the custom authentication context
  const { toast } = useToast(); // Hook to show toast notifications

  // Handle form submission for login
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent the default form submission behavior
    if (login(email, password)) {
      // If login is successful
      toast({
        title: "Welcome back!", // Title of the toast
        description: "You have successfully logged in.", // Description of the toast
      });
      navigate("/tasks"); // Navigate to the tasks page after successful login
    } else {
      // If login fails
      toast({
        title: "Error", // Title of the toast
        description: "Invalid email or password", // Description of the error
        variant: "destructive", // Destructive style for error notifications
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      {/* Card component to contain the login form */}
      <Card className="w-full max-w-md p-6">
        <h1 className="text-2xl font-bold text-center mb-6">Login</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email input field */}
          <div>
            <Input
              type="email"
              placeholder="Email"
              value={email} // Bind the state to the input field
              onChange={(e) => setEmail(e.target.value)} // Update state on input change
              required // Make this field mandatory
            />
          </div>
          {/* Password input field */}
          <div>
            <Input
              type="password"
              placeholder="Password"
              value={password} // Bind the state to the input field
              onChange={(e) => setPassword(e.target.value)} // Update state on input change
              required // Make this field mandatory
            />
          </div>
          {/* Submit button for the form */}
          <Button type="submit" className="w-full">
            Login
          </Button>
        </form>
      </Card>
    </div>
  );
}

/* 
  Hooks used in this component:
  1. useState: To manage the email and password states.
  2. useNavigate: To programmatically navigate to another route after successful login.
  3. useAuth: Custom hook to access the login function from the authentication context.
  4. useToast: To display toast notifications for success and error messages.
*/

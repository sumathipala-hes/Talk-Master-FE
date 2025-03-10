import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import { setToken, setUser } from '@/store/slices/authSlice';
import { useDispatch } from "react-redux";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const user = localStorage.getItem("user");
    if (token && user) {
      dispatch(setToken(token));
      dispatch(setUser(JSON.parse(user)));
    } else {
      navigate('/login');
    }
  });

  return (
    <div className="min-h-screen bg-background">
      <Header>
        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetTrigger asChild className="lg:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-72">
            <Sidebar onNavigate={() => setIsMobileMenuOpen(false)} isMobile={isMobileMenuOpen} />
          </SheetContent>
        </Sheet>
      </Header>
      
      <div className="flex w-full">
        <aside className="hidden lg:block w-64 min-h-screen">
          <Sidebar />
        </aside>
        <main className="flex-1 w-full p-6 overflow-x-hidden">
          <div className="max-w-[1400px] mx-auto w-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
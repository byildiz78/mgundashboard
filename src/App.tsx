import React, { useState } from 'react'
import { cn } from "./lib/utils"
import { Button } from "./components/ui/button"
import {
  BarChart2,
  MessageSquare,
  ShoppingCart,
  BarChart,
  Users,
  ClipboardCheck,
  Wallet,
  UserCircle,
  ChevronDown,
  ChevronRight,
  Calendar,
} from 'lucide-react'

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

const Sidebar = ({ className }: SidebarProps) => {
  const [openItems, setOpenItems] = React.useState<string[]>([])

  const toggleItem = (item: string) => {
    setOpenItems((prev) =>
      prev.includes(item)
        ? prev.filter((i) => i !== item)
        : [...prev, item]
    )
  }

  const menuItems = [
    { 
      icon: BarChart2, 
      text: "Dashboard",
      subItems: [
        "Ürün Satış Analizleri",
        "Ürün Bazlı Satış Dashboard",
        "Cirolar Özet",
        "Mobil",
        "Günlük-Haftalık-Aylık Satış Analizi",
        "Kazanç Raporları",
        "İptal İşlemleri"
      ]
    },
    { icon: MessageSquare, text: "AI" },
    { icon: MessageSquare, text: "Chatbot" },
    { 
      icon: ShoppingCart, 
      text: "Satış",
      subItems: [
        "Grup Bazlı Satış",
        "Kategori Bazlı Satış",
        "Ürün Bazlı Satış",
        "Adisyon Listesi",
        "Adisyon Listesi (Paket)",
        "Adisyon Kapanış Listesi",
        "Ürün Bazlı Satış - Maliyet",
        "PKM - Ciro Bazlı",
        "PKM - Ürün Bazlı"
      ]
    },
    { icon: BarChart, text: "Analiz" },
    { icon: Users, text: "Personel" },
    { icon: ClipboardCheck, text: "Denetim" },
    { icon: Wallet, text: "Kasa" },
    { icon: UserCircle, text: "Müşteri" },
  ]

  return (
    <div className={cn("pb-12 w-64 bg-gray-100 h-screen fixed left-0 top-0 z-10 overflow-y-auto", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2 bg-blue-600 text-white">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Menu
          </h2>
        </div>
        <div className="space-y-1">
          {menuItems.map((item, index) => (
            <div key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
              <Button
                variant="ghost"
                className="w-full justify-start rounded-none hover:bg-blue-100 transition-colors duration-200"
                onClick={() => item.subItems && toggleItem(item.text)}
              >
                <item.icon className="mr-2 h-4 w-4" />
                {item.text}
                {item.subItems && (
                  openItems.includes(item.text) ? (
                    <ChevronDown className="ml-auto h-4 w-4" />
                  ) : (
                    <ChevronRight className="ml-auto h-4 w-4" />
                  )
                )}
              </Button>
              {item.subItems && openItems.includes(item.text) && (
                <div className="pl-6 py-2 space-y-1 bg-blue-50">
                  {item.subItems.map((subItem, subIndex) => (
                    <Button
                      key={subIndex}
                      variant="ghost"
                      className="w-full justify-start text-sm hover:bg-blue-100 transition-colors duration-200"
                    >
                      {subItem}
                    </Button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

const TopMenu = () => {
  const [dateRange, setDateRange] = useState({ start: '01/01/2024', end: '08/10/2024' })
  const [quickDate, setQuickDate] = useState('Bu Yıl')
  const [selectedBranches, setSelectedBranches] = useState('3 şube seçildi')

  return (
    <div className="flex items-center justify-between p-4 bg-white border-b ml-64">
      <div className="flex items-center space-x-4">
        <div className="relative">
          <Button variant="outline" className="w-32">
            {quickDate} <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
        <div className="flex items-center space-x-2">
          <span>Başlangıç</span>
          <div className="relative">
            <input
              type="text"
              value={dateRange.start}
              onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
              className="border rounded p-2 w-32"
            />
            <Calendar className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span>Bitiş</span>
          <div className="relative">
            <input
              type="text"
              value={dateRange.end}
              onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
              className="border rounded p-2 w-32"
            />
            <Calendar className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>
        </div>
        <div className="relative">
          <Button variant="outline" className="w-40">
            Şube <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
        <div className="bg-gray-100 rounded px-2 py-1 text-sm">
          {selectedBranches}
        </div>
      </div>
      <Button className="bg-red-500 hover:bg-red-600 text-white">
        Uygula
      </Button>
    </div>
  )
}

const App = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <TopMenu />
        <div className="flex-1 p-8 ml-64">
          <h1 className="text-2xl font-bold">Welcome to the Dashboard</h1>
          <p>Select an option from the sidebar to get started.</p>
        </div>
      </div>
    </div>
  )
}

export default App
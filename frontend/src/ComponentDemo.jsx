import React, { useState } from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger, TooltipArrow } from './components/ui/tooltip';
import { Popover, PopoverContent, PopoverTrigger } from './components/ui/popover';
import { HoverCard, HoverCardContent, HoverCardTrigger } from './components/ui/hover-card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './components/ui/select';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './components/ui/dropdown-menu';
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from './components/ui/context-menu';
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger } from './components/ui/menubar';

function ComponentDemo() {
  const [side, setSide] = useState('inline-start');

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 to-indigo-600 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-bold text-white text-center mb-4">
          shadcn/ui Components Demo
        </h1>
        <p className="text-white/90 text-center mb-8">
          All components support inline-start and inline-end positioning
        </p>

        <div className="bg-white rounded-2xl p-8 shadow-2xl mb-8">
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">Select Side:</label>
            <select 
              value={side} 
              onChange={(e) => setSide(e.target.value)}
              className="w-full p-3 border-2 border-purple-300 rounded-lg"
            >
              <option value="top">Top</option>
              <option value="bottom">Bottom</option>
              <option value="left">Left</option>
              <option value="right">Right</option>
              <option value="inline-start">Inline Start</option>
              <option value="inline-end">Inline End</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-8">
            {/* Tooltip */}
            <div className="p-6 bg-gray-50 rounded-xl">
              <h3 className="font-bold text-lg mb-4 text-gray-800">Tooltip</h3>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button className="px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700">
                      Hover me
                    </button>
                  </TooltipTrigger>
                  <TooltipContent side={side}>
                    <p>Tooltip with {side} positioning</p>
                    <TooltipArrow />
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            {/* Popover */}
            <div className="p-6 bg-gray-50 rounded-xl">
              <h3 className="font-bold text-lg mb-4 text-gray-800">Popover</h3>
              <Popover>
                <PopoverTrigger asChild>
                  <button className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700">
                    Open Popover
                  </button>
                </PopoverTrigger>
                <PopoverContent side={side}>
                  <div className="space-y-2">
                    <h4 className="font-semibold">Popover Content</h4>
                    <p className="text-sm text-gray-600">Side: {side}</p>
                  </div>
                </PopoverContent>
              </Popover>
            </div>

            {/* HoverCard */}
            <div className="p-6 bg-gray-50 rounded-xl">
              <h3 className="font-bold text-lg mb-4 text-gray-800">Hover Card</h3>
              <HoverCard>
                <HoverCardTrigger asChild>
                  <button className="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700">
                    Hover Card
                  </button>
                </HoverCardTrigger>
                <HoverCardContent side={side}>
                  <div className="space-y-2">
                    <h4 className="font-semibold">Hover Card</h4>
                    <p className="text-sm text-gray-600">Positioned at {side}</p>
                  </div>
                </HoverCardContent>
              </HoverCard>
            </div>

            {/* Select */}
            <div className="p-6 bg-gray-50 rounded-xl">
              <h3 className="font-bold text-lg mb-4 text-gray-800">Select</h3>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select option" />
                </SelectTrigger>
                <SelectContent side={side}>
                  <SelectItem value="1">Option 1</SelectItem>
                  <SelectItem value="2">Option 2</SelectItem>
                  <SelectItem value="3">Option 3</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Dropdown Menu */}
            <div className="p-6 bg-gray-50 rounded-xl">
              <h3 className="font-bold text-lg mb-4 text-gray-800">Dropdown Menu</h3>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="px-6 py-3 bg-orange-600 text-white rounded-lg font-semibold hover:bg-orange-700">
                    Open Menu
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent side={side}>
                  <DropdownMenuItem>Item 1</DropdownMenuItem>
                  <DropdownMenuItem>Item 2</DropdownMenuItem>
                  <DropdownMenuItem>Item 3</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Context Menu */}
            <div className="p-6 bg-gray-50 rounded-xl">
              <h3 className="font-bold text-lg mb-4 text-gray-800">Context Menu</h3>
              <ContextMenu>
                <ContextMenuTrigger asChild>
                  <div className="px-6 py-12 bg-red-100 border-2 border-red-300 rounded-lg text-center font-semibold text-red-700">
                    Right-click me
                  </div>
                </ContextMenuTrigger>
                <ContextMenuContent>
                  <ContextMenuItem>Action 1</ContextMenuItem>
                  <ContextMenuItem>Action 2</ContextMenuItem>
                  <ContextMenuItem>Action 3</ContextMenuItem>
                </ContextMenuContent>
              </ContextMenu>
            </div>

            {/* Menubar */}
            <div className="p-6 bg-gray-50 rounded-xl col-span-2">
              <h3 className="font-bold text-lg mb-4 text-gray-800">Menubar</h3>
              <Menubar>
                <MenubarMenu>
                  <MenubarTrigger>File</MenubarTrigger>
                  <MenubarContent side={side}>
                    <MenubarItem>New</MenubarItem>
                    <MenubarItem>Open</MenubarItem>
                    <MenubarItem>Save</MenubarItem>
                  </MenubarContent>
                </MenubarMenu>
                <MenubarMenu>
                  <MenubarTrigger>Edit</MenubarTrigger>
                  <MenubarContent side={side}>
                    <MenubarItem>Cut</MenubarItem>
                    <MenubarItem>Copy</MenubarItem>
                    <MenubarItem>Paste</MenubarItem>
                  </MenubarContent>
                </MenubarMenu>
              </Menubar>
            </div>
          </div>
        </div>

        <div className="text-center">
          <a 
            href="/"
            className="inline-block px-8 py-4 bg-white text-purple-600 rounded-xl font-bold text-lg hover:bg-gray-100 transition"
          >
            ← Back to Medicine Tracker
          </a>
        </div>
      </div>
    </div>
  );
}

export default ComponentDemo;

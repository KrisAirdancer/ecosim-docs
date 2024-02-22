EcoSim is an economy simulation engine for Unity games. With EcoSim, developers can quickly add economies with dynamic and responsive item prices to their games. EcoSim allows for the configuration of different commodities with varying levels of supply and demand, the sensitivity of commodity prices to changes in supply and demand, as well as inflation and deflation of prices.

# Quick Start

If you want to get up and running quickly, start by making a new commodity for each one of the items in your game. EcoSim comes with a single commodity configured as an example. Copy the configurations from this commodity to the new commodities you are making for your game. These configurations will give you items with stable prices. Finally, delete the default commodity.

All of the above steps can be completed using the Unity UI Tools that come with EcoSim and are located in the toolbar at the top of the Unity editor.

From here, you can adjust the configurations for each commodity to customize their behavior. Additionally, the behavior of the simulation can be viewed visually using the EcoSim Vis tool (see the "EcoSim Vis" section for instructions on using this tool).

For information on configuring the the behavior of the simulation, see the "Setup & Configurations" section below.

# How It Works

EcoSim adjusts the prices of items, referred to as commodities, by setting the "price velocity" of that commodity based on the supply and demand of the commodity that pushes the price of the good up or down. Prices are updated based on the laws of supply and demand. Namely, if supply > demand, then prices drop; if demand > supply, prices increase.

While prices do change in response to changes in supply and demand, the market has a "memory" for past prices and will thus stabilize towards a running average of historical prices. If no changes in supply or demand occur, prices will stabilize and change only if inflation or deflation has been configured.

The simulation runs in cycles that can be configured to run faster or slower based on the needs of the game in which the simulation is running. During each cycle, supply and demand are evaluated and prices are updated accordingly. Because of this, the cycle rate will determine how fast prices inflate/deflate and how fast prices recover from economic events.

# Setup & Configuration

EcoSim is provides control over the simulation in two main ways. The first is by providing general configurations and the second is by configuring the commodities (items) represented in the simulation.

Note that the majority of configuration changes will be made to the commodities themselves as it is their behaviors that determine the overall behavior of the economy.

## General Configurations

As was mentioned above, EcoSim runs in cycles and the cycle rate can affect the way your simulation feels to players in your game. As such, the cycle rate, `timeStep`, can be configured as needed.
- `timeStep` (int) - Represents the number of milliseconds to wait between economic cycles.
    - Smaller values lead to a "faster" simulation, which means faster price inflation/deflation (if configured) and faster stabilization of prices after changes in supply/demand. Larger values lead to slower price inflation/deflation and slower stabilization of prices.

There are additional configurations in this file/section that are solely for convenience - they have no effect on the behavior of the simulation. Instead, these configurations allow EcoSim to provide meaningfully labeled output in the visualizer, logs, and the terminal.
- `currencyName` (string) - a human readable name for the currency in your game. e.g. "dollars" or "gold"
- `currencyUnits` (string) - a human readable unit abbreviation. e.g. "USD" or "gp"
- `currencySymbol` (string) - a currency symbol. e.g. "$"

All of the above configurations are required, however, if you wish not to include the convenience fields, simply set them to an empty string.

Note that EcoSim currently only supports a single currency.

## Commodity Configurations

The commodities configured in the simulation should match the items in your game 1-to-1. For example, if your game has "bread" as an in-game item, then you should configure "bread" as a commodity in EcoSim.

Each commodity has properties that can be configured that determine their behavior in response to economic events (supply/demand changes).

To achieve the desired behavior, the following properties can be configured for each commodity. Note that all properties must have a value.
- `name` (string) - a unique identifier used to track this commodity in the simulation.
    - It is recommended that this match either the name of the item in your game, or the item's ID.
- `price` (int) - the price that the commodity will start the game with.
    - Over time, this value will change in response to supply/demand.
- `supply` (int) - the number of units of the commodity that are available for trade in a given round.
    - Note that this value can be arbitrary or can represent the actual number of units available in the game. So long as `supply` is updated in a consistent way, prices will respond correctly.
    - Supply can be changed as the simulation runs (by preconfigured events), so this value represents the starting value.
- `demand` (int) - the number of units of the commodity that are desired by buyers in a given round.
    - Note that this value can be arbitrary or can represent the actual number of units available in the game. So long as `demand` is updated in a consistent way, prices will respond correctly.
    - Demand can be changed as the simulation runs, so this value represents the starting value.
- `needLevel` (int) - the baseline level of demand in the simulation.
    - `needLevel` is used to stabilize the `demand` value after large changes in demand and should be configured to the value to which demand should stabilize towards. Given enough rounds, demand will eventually converge to this value.
- `movingAvgDuration` (int) - the number of rounds of price values to factor into the moving average for the commodity.
    - This value represents how volatile prices are in response to fluctuations in supply and demand. Higher values make prices less volatile and lower values make prices more volatile.
- `inflationRate` (int) - the rate at which a commodity's price will increase or decrease over time.
    - Note that this rate is not a percentage and is instead an arbitrary value.
    - A value of zero indicates no change in price over time, positive values indicate inflation (price increase) and negative values indicate deflation (price decrease).
    - Values farther away from zero result in faster price changes.

### Events Configuration

An event consists of a change in supply, a change in demand, or both for a specific commodity.

A single event can consist of an adjustment to a single commodity or an adjustment to many commodities. When the event is run, it will apply all of the adjustments to the economic simulation at once.

To configure an event, use the Unity UI Tools to update the following values.
- "Commodity" - the exact name of the commodity that the event will affect.
- "Supply Shift" - the amount by which the event will change the supply of the specified commodity.
- "Demand Shift" - the amount by which the event will change the demand of the specified commodity.

### Configuration Tips

If you want a commodity to start the game at a stable price, set `supply`, `demand`, and `needLevel` to equal values.

If you want a commodity to start the game with an increasing price that stabilizes to a set price over time, set `demand` greater than both `supply` and `demand`, and `price` to the desired stabilization price.
- Configure the `movingAvgDuration` to a higher value to ensure a smaller impact on the long-term price of the commodity and thus a return to the set initial `price` value.
- Note that you should not use `inflationRate` to induce short term price changes.

# Using the Unity UI Tools

EcoSim is fully integrated with Unity and includes tools that can be used to configure the simulation directly from the Unity UI. No need to edit those pesky config files (unless you **really** want to).

### Quick Start Guide

If you every need a quick refresher for how to use the UI tools, this window will give a brief overview of the available tools.

### Engine Configuration

This is where you can configure the settings for the engine. Really it's just the tick rate of each economic round. However, you are able to also name the currency used in your game, the units used to describe the currency, and designate an ASCII character to use as the symbol of your currency.

### Commodity Configuration

Here is the main configuration menu for your economy. You can add, edit, and remove items from your economy. To add a new commodity, you supply the name, initial price (for trading round 1), initial supply, initial demand, the needs level, and the moving average duration for this new commodity. Once happy with everything, click the "Add commodity" to add it to the simulation!

Once all of the commodities are set to how you need them, click the "Save commodities" to save your changes to the 'commodityConfig.json' file.

# EcoSim Vis

EcoSim Vis is a visualization tool that provides better insight into the behavior of a running simulation. EcoSim Vis is built as a "view" that is added to your game as a development mode feature but will not be included in your final game package. It provides an overview of the commodities in the game along with their price, demand, and supply values plotted over time.

With this tool, you can more easily see an overview of your game's economy and quickly determine which commodities are behaving as desired and which ones are not.

The following steps outline how to use EcoSim vis.

1) Start your game as normal.
2) Press spacebar to start the economic simulation.
3) Press 8 on the keyboard to open EcoSim Vis.

From here, the panel showing the economic simulation data will be displayed. You can now hover over each of the commodity entries to display their data graphically in the plots on the right-hand side of the screen.

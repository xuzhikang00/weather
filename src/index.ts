import commander from "commander"
import colors from "colors"
commander
    .version("0.1.0")
    .option("-c, --city [name]", "Add city name")
    .parse(process.argv)
if (process.argv.slice(2).length===0) {
    commander.outputHelp(colors.red);
    process.exit();
}
console.log(commander.city)
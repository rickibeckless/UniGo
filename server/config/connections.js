
const connectDB = async () => {
    try {

        console.log('Connection established');
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

export default connectDB;
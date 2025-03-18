const Mission = () => {
    return (
        <div className=" py-16 px-4 bg-gradient-to-b from-blue-50 to-white">
            <h2 className="text-3xl font-poppins font-semibold text-center mb-16">Who We Are!</h2>
            
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                    <div className="relative overflow-hidden rounded-xl h-64">
                        <img 
                            src="https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                            alt="Founder" 
                            className="w-full h-full object-cover transform group-hover:scale-105 transition duration-300"
                        />
                    </div>
                    <div className="mt-6 text-center">
                        <h3 className="text-xl font-poppins font-semibold text-gray-800">Supto</h3>
                        <p className="text-blue-600 font-medium mt-2">Founder & CEO</p>
                        <p className="text-gray-600 mt-4">
                            Visionary leader with 15+ years experience in social entrepreneurship
                        </p>
                    </div>
                </div>
                <div className="group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                    <div className="relative overflow-hidden rounded-xl h-64">
                        <img 
                            src="https://images.pexels.com/photos/2422293/pexels-photo-2422293.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                            alt="Our Team" 
                            className="w-full h-full object-cover transform group-hover:scale-105 transition duration-300"
                        />
                    </div>
                    <div className="mt-6 text-center">
                        <h3 className="text-xl font-poppins font-semibold text-gray-800">Dedicated Team</h3>
                        <p className="text-blue-600 font-medium mt-2">Passionate Professionals</p>
                        <p className="text-gray-600 mt-4">
                            50+ experts in community development and social impact
                        </p>
                    </div>
                </div>
                <div className="group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                    <div className="relative overflow-hidden rounded-xl h-64">
                        <img 
                            src="https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                            alt="Community" 
                            className="w-full h-full object-cover transform group-hover:scale-105 transition duration-300"
                        />
                    </div>
                    <div className="mt-6 text-center">
                        <h3 className="text-xl font-poppins font-semibold text-gray-800">Global Community</h3>
                        <p className="text-blue-600 font-medium mt-2">Volunteers & Partners</p>
                        <p className="text-gray-600 mt-4">
                            100,000+ active members creating change worldwide
                        </p>
                    </div>
                </div>
            </div>
            <div className="max-w-3xl mx-auto mt-20 text-center px-4">
                <h3 className="text-2xl font-poppins font-semibold text-gray-800 mb-6">
                    Our Mission
                </h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                    To empower communities through collaborative action, creating sustainable solutions
                    that bridge gaps in education, environment, and social welfare. We believe in the
                    power of collective effort to drive meaningful, lasting change.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
                    <div className="text-center">
                        <div className="text-3xl font-bold text-blue-600">15+</div>
                        <div className="text-gray-600 mt-1">Years Experience</div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl font-bold text-blue-600">120+</div>
                        <div className="text-gray-600 mt-1">Projects Completed</div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl font-bold text-blue-600">50K+</div>
                        <div className="text-gray-600 mt-1">Volunteers Engaged</div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl font-bold text-blue-600">1M+</div>
                        <div className="text-gray-600 mt-1">Lives Impacted</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Mission;
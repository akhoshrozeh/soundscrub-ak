const Profile = ({name, desc}) => {

  return (
    <section className="w-full">
        <h1 className="head_text text_full">{name} <span className="blue_gradient">
            
            Profile</span></h1>
            <p className='desc text-left'>{desc}</p>

            <div className="flex-grow border-t border-gray-400"></div>

            <div className="mt-16">
            
                
            </div> 
    </section>
  )
}

export default Profile
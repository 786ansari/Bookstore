import logo from './logo.svg';
import './App.css';

function SectionFirst() {
  return (
      <div className='top-section'>
         <div className='container'>
            <div className='row'>
                <div className='col-lg-8 col-sm-12'>
                    <div className='banner-slider'>
                    <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
                        <div class="carousel-indicators">
                            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                        </div>
                        <div class="carousel-inner">
                            <div class="carousel-item active">
                            <a href='#'>
                                <img src="images/1.jpg" class="d-block w-100" alt="..."/>
                            </a>
                            </div>
                            <div class="carousel-item">
                            <a href='#'>   
                              <img src="images/2.jpg" class="d-block w-100" alt="..."/>
                            </a>
                            </div>
                            <div class="carousel-item">
                            <a href='#'>  
                                <img src="images/3.jpg" class="d-block w-100" alt="..."/>
                            </a>
                            </div>
                            <div class="carousel-item">
                            <a href='#'>  
                                <img src="images/4.jpg" class="d-block w-100" alt="..."/>
                            </a>
                            </div>
                            <div class="carousel-item">
                            <a href='#'>  
                               <img src="images/5.jpg" class="d-block w-100" alt="..."/>
                            </a>
                            </div>
                        </div>
                        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                           {/* <span class="carousel-control-prev-icon" aria-hidden="true"></span>*/}
                            <span class="visually-hidden">Previous</span>
                        </button>
                        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                          {/*  <span class="carousel-control-next-icon" aria-hidden="true"></span> */}
                            <span class="visually-hidden">Next</span>
                        </button>
                        </div>
                    </div>
                </div>
                <div className='col-lg-4 col-sm-12'>
                    <div className='category-top'>
                        <div className='row'>
                            <div className='col-sm-7'>
                                <div className='cat-header'>
                                     <span>
                                     
                                     </span>
                                     <span>Catrgories</span>
                                </div>
                            </div>
                            <div className='col-sm-5 trans-but'>
                                 <div className='langauge-translate'>
                                    <span >English</span>
                                    <span>Hindi</span>
                                 </div>
                            </div>                            
                        </div>
                    </div> 
                    <div className='row'>
                    <div className='col-sm-12 catrgory-list'>
                                <ul>
                                    <li><a href="books/air-force-entrance-exam.html">AIR FORCE</a></li>
                                    <li><a href="books/arithmetic-or-maths.html">ARITHMETIC/MATHS</a></li>        		
                                    <li><a href="books/lic-gic-oic-exam.html">LIC/GIC/OIC</a></li>
                                    <li><a href="books/mba-mca-bba-bca-bit-hm-llb-cat-ttm-entrance-exam.html">MBA/MCA/BBA/BCA/ BIT/H.M./LLB./CAT/TTM</a></li>
                                    <li><a href="books/miscellaneous-books.html">MISCELLANEOUS BOOKS</a></li>
                                    <li><a href="books/nda-cds-exam.html">N.D.A./C.D.S.</a></li>
                                    <li><a href="books/navodaya-vidyalaya-admission-exam.html">NAVODAYA VIDYALAYA</a></li>
                                    <li><a href="books/ntse-stse-exam.html">NTSE/STSE</a></li>
                                    <li><a href="books/online-test.html">ONLINE TEST</a></li>
                                    <li><a href="books/pmt-pet-nursing-exam.html">PMT/PET/NURSING</a></li>
                                    <li><a href="books/police-constable-exam.html">POLICE CONSTABLE</a></li>        		
                                </ul>
                            </div>
                    </div>                   
                </div>
            </div>
         </div>

         <div className='banner-section'>
            <div className='container'>
               

               


            </div>
         </div>

      </div>
  

     

    
  );
}

export default SectionFirst;

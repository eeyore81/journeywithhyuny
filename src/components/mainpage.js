import React from 'react';
import {Image, Icon, Grid} from 'semantic-ui-react';

import './header-img.css';

let MainPage = (props) => { 
    return (<div id="container" className="container">
        <Grid>
    <Grid.Column width={1}/>
    <Grid.Column width={11}>
        <div className="header">
            <div className="header image"/>        
            <div className="header text">Journey with Hyuny</div>
        </div>


        <p className="poem"> Desiderata </p>
        <p className="poem">Go placidly amid the noise and the haste, and remember what peace there may be in silence. As far as possible, without surrender, be on good terms with all persons.</p>
<p className="poem">
    Speak your truth quietly and clearly; and listen to others, even to the dull and the ignorant; they too have their story.
</p>
<p className="poem">
    Avoid loud and aggressive persons; they are vexatious to the spirit. If you compare yourself with others, you may become vain or bitter, for always there will be greater and lesser persons than yourself.
</p>
<p className="poem">
    Enjoy your achievements as well as your plans. Keep interested in your own career, however humble; it is a real possession in the changing fortunes of time.
</p>
<p className="poem">
    Exercise caution in your business affairs, for the world is full of trickery. But let this not blind you to what virtue there is; many persons strive for high ideals, and everywhere life is full of heroism.
</p>
<p className="poem">
    Be yourself. Especially do not feign affection. Neither be cynical about love; for in the face of all aridity and disenchantment, it is as perennial as the grass.
</p>
<p className="poem">
    Take kindly the counsel of the years, gracefully surrendering the things of youth.
</p>
<p className="poem">
    Nurture strength of spirit to shield you in sudden misfortune. But do not distress yourself with dark imaginings. Many fears are born of fatigue and loneliness.
</p>
<p className="poem">
    Beyond a wholesome discipline, be gentle with yourself. You are a child of the universe no less than the trees and the stars; you have a right to be here.
</p>
<p className="poem">
    And whether or not it is clear to you, no doubt the universe is unfolding as it should. Therefore be at peace with God, whatever you conceive Him to be. And whatever your labors and aspirations, in the noisy confusion of life, keep peace in your soul. With all its sham, drudgery and broken dreams, it is still a beautiful world. Be cheerful. Strive to be happy.
</p>
<p className="poem"> - Max Ehrmann</p>
<iframe width="887" height="666" src="https://www.youtube.com/embed/K6G7t1t55iI" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</Grid.Column>
</Grid>
<br></br><br></br><br></br>
<br></br><br></br><br></br>
    </div>
    );

}
export default MainPage;